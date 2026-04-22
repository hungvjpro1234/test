"""
tests/test_auth_logout.py
FR-AUTH-5: Đăng xuất
"""
import time
import pytest
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from utils.config import Config

MODULE = "FR-AUTH-5: Logout"


@pytest.fixture
def logged_in(driver):
    """Log in as active user and return auth page."""
    page = AuthPage(driver)
    page.open_auth()
    page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
    # Give it more time to redirect and render dashboard
    time.sleep(5) 
    assert page.is_logged_in(), f"Pre-condition: must be logged in (Current URL: {driver.current_url})"
    return page


class TestLogout:

    @pytest.mark.function
    def test_TC_LOGOUT_01_successful_logout(self, driver, logged_in, report):
        """FR-AUTH-5.1 — Đăng xuất thành công → về trang Login."""
        page = logged_in
        dash = DashboardPage(driver)
        dash.logout()
        time.sleep(2)

        auth = AuthPage(driver)
        assert auth.is_on_login_form(), "Should be on login form after logout"
        report.record("TC_LOGOUT_01", MODULE, "Logout redirects to login page", "PASS",
                      f"URL: {auth.get_current_url()}")

    @pytest.mark.business
    def test_TC_LOGOUT_02_cannot_access_protected_after_logout(self, driver, logged_in, report):
        """FR-AUTH-5.2 — Sau đăng xuất, không thể truy cập trang protected."""
        dash = DashboardPage(driver)
        dash.logout()
        time.sleep(1.5)

        # Try to navigate to dashboard
        dash.open("/dashboard")
        time.sleep(2)

        auth = AuthPage(driver)
        is_blocked = auth.is_on_login_form() or "login" in auth.get_current_url().lower()
        assert is_blocked, "Should be blocked from accessing dashboard after logout"
        report.record("TC_LOGOUT_02", MODULE,
                      "Protected route blocked after logout", "PASS",
                      f"URL: {auth.get_current_url()}")
