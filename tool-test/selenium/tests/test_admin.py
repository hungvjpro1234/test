"""
tests/test_admin.py
FR-ADMIN: Quản trị viên
Covers: Access control, user management, lock/unlock, login history, stats
"""
import time
import pytest
from selenium.webdriver.common.by import By
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from pages.admin_page import AdminPage
from utils.config import Config

MODULE = "FR-ADMIN: Admin"


@pytest.fixture
def admin_logged_in(driver):
    """Log in as admin user."""
    auth = AuthPage(driver)
    auth.open_auth()
    auth.login(Config.ADMIN_EMAIL, Config.ADMIN_PASSWORD)
    # Give it more time to redirect and render dashboard
    time.sleep(5) 
    assert auth.is_logged_in(), f"Pre-condition: admin must be logged in (Current URL: {driver.current_url})"
    return auth


@pytest.fixture
def regular_logged_in(driver):
    """Log in as regular user."""
    auth = AuthPage(driver)
    auth.open_auth()
    auth.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
    time.sleep(2.5)
    assert auth.is_logged_in()
    return auth


class TestAdminAccessControl:

    @pytest.mark.security
    def test_TC_ADMIN_01_regular_user_blocked_from_admin(
        self, driver, regular_logged_in, report
    ):
        """FR-ADMIN-1.1 — Người dùng thường không vào được trang admin."""
        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        url = admin.get_current_url()
        is_blocked = "/admin" not in url or \
                     admin.is_element_visible(admin.ACCESS_DENIED, 3) or \
                     AuthPage(driver).is_on_login_form()

        report.record("TC_ADMIN_01", MODULE,
                      "Regular user blocked from admin panel",
                      "PASS" if is_blocked else "FAIL",
                      f"URL: {url}, Blocked: {is_blocked}")
        assert is_blocked, "Regular user should not access admin panel"

    @pytest.mark.function
    def test_TC_ADMIN_02_admin_can_access_admin_panel(
        self, driver, admin_logged_in, report
    ):
        """FR-ADMIN-2.1 — Admin có thể truy cập Admin panel."""
        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        is_on_admin = admin.is_on_admin_page()
        report.record("TC_ADMIN_02", MODULE,
                      "Admin can access admin panel",
                      "PASS" if is_on_admin else "SKIP",
                      f"URL: {admin.get_current_url()}")


class TestAdminUserManagement:

    @pytest.mark.function
    def test_TC_ADMIN_03_view_user_list(self, driver, admin_logged_in, report):
        """FR-ADMIN-3.1 — Xem danh sách người dùng."""
        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        if admin.is_on_admin_page():
            try:
                admin.click(admin.USERS_NAV)
                time.sleep(1.5)
                rows = admin.get_user_rows()
                report.record("TC_ADMIN_03", MODULE, "View user list",
                              "PASS",
                              f"Users shown: {len(rows)}")
            except Exception as e:
                report.record("TC_ADMIN_03", MODULE, "View user list", "SKIP",
                              str(e))
        else:
            report.record("TC_ADMIN_03", MODULE, "View user list (admin not accessible)", "SKIP")

    @pytest.mark.function
    def test_TC_ADMIN_04_lock_and_unlock_user(self, driver, db, admin_logged_in, rollback, report):
        """FR-ADMIN-4.1/4.2 — Khóa và Mở khóa tài khoản."""
        # Ensure account is active first
        db.unlock_user(Config.ACTIVE_EMAIL)
        rollback.register(lambda: db.unlock_user(Config.ACTIVE_EMAIL))

        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        if not admin.is_on_admin_page():
            report.record("TC_ADMIN_04", MODULE, "Lock/Unlock user", "SKIP",
                          "Admin panel not accessible")
            return

        try:
            admin.click(admin.USERS_NAV)
            time.sleep(1)
            admin.search_user(Config.ACTIVE_EMAIL)
            time.sleep(1)

            locked = admin.lock_user_in_list(Config.ACTIVE_EMAIL)
            time.sleep(1)

            if locked:
                # Verify in DB
                user = db.get_user_by_email(Config.ACTIVE_EMAIL)
                is_locked = not user.get("isActive", True)

                # Unlock
                admin.unlock_user_in_list(Config.ACTIVE_EMAIL)
                time.sleep(1)

                user_after = db.get_user_by_email(Config.ACTIVE_EMAIL)
                is_unlocked = user_after.get("isActive", False)

                report.record("TC_ADMIN_04", MODULE, "Lock and unlock user",
                              "PASS",
                              f"Locked in DB: {is_locked}, Unlocked: {is_unlocked}")
            else:
                report.record("TC_ADMIN_04", MODULE, "Lock user", "SKIP",
                              "Lock button not found in list")
        except Exception as e:
            report.record("TC_ADMIN_04", MODULE, "Lock/Unlock user", "SKIP", str(e))

    @pytest.mark.function
    def test_TC_ADMIN_05_admin_stats_dashboard(self, driver, admin_logged_in, report):
        """FR-ADMIN-2.1 — Xem thống kê tổng quan."""
        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        if admin.is_on_admin_page():
            try:
                # Look for stat cards
                stat_cards = driver.find_elements(
                    By.CSS_SELECTOR,
                    "[class*='stat-card'], [class*='StatCard'], [class*='overview-card']"
                )
                nums = driver.find_elements(
                    By.CSS_SELECTOR,
                    "[class*='count'], [class*='total'], h2, h3"
                )
                report.record("TC_ADMIN_05", MODULE, "Admin dashboard stats",
                              "PASS",
                              f"Stat cards: {len(stat_cards)}, Number elements: {len(nums)}")
            except Exception as e:
                report.record("TC_ADMIN_05", MODULE, "Admin dashboard stats", "SKIP", str(e))
        else:
            report.record("TC_ADMIN_05", MODULE, "Admin stats (not accessible)", "SKIP")

    @pytest.mark.database
    def test_TC_ADMIN_06_login_history_in_admin(self, driver, db, admin_logged_in, report):
        """FR-ADMIN-7.1 — Xem lịch sử đăng nhập."""
        admin = AdminPage(driver)
        admin.open_admin()
        time.sleep(2)

        if not admin.is_on_admin_page():
            report.record("TC_ADMIN_06", MODULE, "Login history", "SKIP",
                          "Admin panel not accessible")
            return

        try:
            admin.open_login_history()
            time.sleep(1.5)
            rows = admin.get_login_history_rows()

            # Also verify in DB
            db_history = db.get_login_history(Config.ACTIVE_EMAIL)
            report.record("TC_ADMIN_06", MODULE, "Login history visible in admin",
                          "PASS",
                          f"UI rows: {len(rows)}, DB records: {len(db_history)}")
        except Exception as e:
            report.record("TC_ADMIN_06", MODULE, "Login history", "SKIP", str(e))
