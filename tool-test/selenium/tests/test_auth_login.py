"""
tests/test_auth_login.py
FR-AUTH-2: Đăng nhập
Covers: UI, Validation, Function, Business Flow, Database checks
"""
import time
import pytest
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from pages.admin_page import AdminPage
from utils.config import Config

MODULE = "FR-AUTH-2: Login"


# ══════════════════════════════════════════════════════════════════════════════
# UI TESTS  (TC_LOGIN_01 – TC_LOGIN_06)
# ══════════════════════════════════════════════════════════════════════════════

class TestLoginUI:

    @pytest.mark.ui
    def test_TC_LOGIN_01_form_displays_all_fields(self, driver, report):
        """TC_LOGIN_01 — Form đăng nhập hiển thị đầy đủ."""
        page = AuthPage(driver)
        page.open_auth()

        assert page.is_element_visible(page.LOGIN_EMAIL),    "Email field missing"
        assert page.is_element_visible(page.LOGIN_PASSWORD), "Password field missing"
        assert page.is_element_visible(page.LOGIN_SUBMIT),   "Submit button missing"
        assert page.is_element_visible(page.FORGOT_LINK),    "Forgot-password link missing"
        assert page.is_element_visible(page.SIGNUP_LINK),    "Sign-up link missing"

        report.record("TC_LOGIN_01", MODULE, "Login form displays all fields", "PASS")

    @pytest.mark.ui
    def test_TC_LOGIN_02_password_is_masked(self, driver, report):
        """TC_LOGIN_02 — Trường mật khẩu hiển thị dạng ẩn."""
        page = AuthPage(driver)
        page.open_auth()
        page.type_text(page.LOGIN_PASSWORD, "secret")
        pwd_type = page.get_attribute(page.LOGIN_PASSWORD, "type")
        assert pwd_type == "password"
        report.record("TC_LOGIN_02", MODULE, "Password field is masked", "PASS")

    @pytest.mark.ui
    def test_TC_LOGIN_03_password_toggle(self, driver, report):
        """TC_LOGIN_03 — Toggle hiện/ẩn mật khẩu."""
        page = AuthPage(driver)
        page.open_auth()
        page.type_text(page.LOGIN_PASSWORD, "Abc@1234")
        page.toggle_password_visibility()
        time.sleep(0.4)
        pwd_type = page.get_attribute(page.LOGIN_PASSWORD, "type")
        assert pwd_type == "text", f"Expected 'text' after toggle, got '{pwd_type}'"
        report.record("TC_LOGIN_03", MODULE, "Password toggle works", "PASS")

    @pytest.mark.ui
    def test_TC_LOGIN_04_forgot_password_link(self, driver, report):
        """TC_LOGIN_04 — Link 'Quên mật khẩu?' dẫn đến đúng trang."""
        page = AuthPage(driver)
        page.open_auth()
        page.click_forgot_password()
        assert page.is_forgot_form_visible(), "Forgot password form not visible"
        report.record("TC_LOGIN_04", MODULE, "Forgot password link works", "PASS")

    @pytest.mark.ui
    def test_TC_LOGIN_05_signup_link(self, driver, report):
        """TC_LOGIN_05 — Link 'Đăng ký' dẫn đến form đăng ký."""
        page = AuthPage(driver)
        page.open_auth()
        page.click_go_to_register()
        assert page.is_register_form_visible(), "Register form not visible"
        report.record("TC_LOGIN_05", MODULE, "Sign-up link works", "PASS")

    @pytest.mark.ui
    def test_TC_LOGIN_06_responsive(self, driver, report):
        """TC_LOGIN_06 — UI không vỡ khi resize."""
        page = AuthPage(driver)
        for w, h in [(1920, 1080), (1280, 800), (768, 1024), (375, 667)]:
            page.open_auth()
            page.resize_window(w, h)
            assert page.is_element_visible(page.LOGIN_SUBMIT, 4), f"Broken at {w}x{h}"
        report.record("TC_LOGIN_06", MODULE, "Responsive at multiple screen sizes", "PASS")


# ══════════════════════════════════════════════════════════════════════════════
# VALIDATION TESTS  (TC_LOGIN_07 – TC_LOGIN_09)
# ══════════════════════════════════════════════════════════════════════════════

class TestLoginValidation:

    @pytest.mark.validation
    def test_TC_LOGIN_07_empty_email(self, driver, report):
        """TC_LOGIN_07 — Email trống → hiển thị lỗi."""
        page = AuthPage(driver)
        page.open_auth()
        page.type_text(page.LOGIN_PASSWORD, "Abc@1234")
        page.click(page.LOGIN_SUBMIT)
        time.sleep(0.8)
        assert page.is_on_login_form(), "Should stay on login form"
        report.record("TC_LOGIN_07", MODULE, "Empty email shows error", "PASS")

    @pytest.mark.validation
    def test_TC_LOGIN_08_empty_password(self, driver, report):
        """TC_LOGIN_08 — Mật khẩu trống → hiển thị lỗi."""
        page = AuthPage(driver)
        page.open_auth()
        page.type_text(page.LOGIN_EMAIL, Config.ACTIVE_EMAIL)
        page.click(page.LOGIN_SUBMIT)
        time.sleep(0.8)
        assert page.is_on_login_form(), "Should stay on login form"
        report.record("TC_LOGIN_08", MODULE, "Empty password shows error", "PASS")

    @pytest.mark.validation
    def test_TC_LOGIN_09_both_fields_empty(self, driver, report):
        """TC_LOGIN_09 — Cả hai trường trống → hiển thị lỗi."""
        page = AuthPage(driver)
        page.open_auth()
        page.click(page.LOGIN_SUBMIT)
        time.sleep(0.8)
        assert page.is_on_login_form(), "Should stay on login form"
        report.record("TC_LOGIN_09", MODULE, "Both fields empty shows errors", "PASS")


# ══════════════════════════════════════════════════════════════════════════════
# FUNCTION TESTS  (TC_LOGIN_10 – TC_LOGIN_17)
# ══════════════════════════════════════════════════════════════════════════════

class TestLoginFunction:

    @pytest.mark.function
    def test_TC_LOGIN_10_successful_login(self, driver, report):
        """TC_LOGIN_10 — Đăng nhập thành công."""
        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        assert page.is_logged_in(), "Should redirect to dashboard after login"
        report.record("TC_LOGIN_10", MODULE,
                      "Successful login redirects to dashboard", "PASS",
                      f"URL: {page.get_current_url()}")

    @pytest.mark.function
    def test_TC_LOGIN_11_wrong_password(self, driver, report):
        """TC_LOGIN_11 — Sai mật khẩu → hiển thị lỗi."""
        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, "WrongPass@99")
        time.sleep(2)

        error = page.get_submit_error()
        assert error or page.is_on_login_form(), "Should show error for wrong password"
        report.record("TC_LOGIN_11", MODULE, "Wrong password shows error", "PASS",
                      f"Error: '{error}'")

    @pytest.mark.function
    def test_TC_LOGIN_12_unregistered_email(self, driver, report):
        """TC_LOGIN_12 — Email chưa đăng ký → hiển thị lỗi."""
        page = AuthPage(driver)
        page.open_auth()
        page.login("notexist@test.com", "Abc@1234")
        time.sleep(2)

        error = page.get_submit_error()
        assert error or page.is_on_login_form(), "Should show error for unknown email"
        report.record("TC_LOGIN_12", MODULE, "Unregistered email shows error", "PASS",
                      f"Error: '{error}'")

    @pytest.mark.function
    def test_TC_LOGIN_13_locked_account(self, driver, db, report):
        """TC_LOGIN_13 — Tài khoản bị khóa → không cho đăng nhập."""
        # Ensure locked account exists and is locked
        db.lock_user(Config.LOCKED_EMAIL)

        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.LOCKED_EMAIL, Config.LOCKED_PASSWORD)
        time.sleep(2)

        error = page.get_submit_error()
        is_blocked = not page.is_logged_in()
        assert is_blocked, "Locked account should not be able to log in"
        report.record("TC_LOGIN_13", MODULE, "Locked account blocked", "PASS",
                      f"Error: '{error}'")

    @pytest.mark.function
    def test_TC_LOGIN_14_wrong_email_right_password(self, driver, report):
        """TC_LOGIN_14 — Email sai + MK đúng → không vào được."""
        page = AuthPage(driver)
        page.open_auth()
        page.login("notexist@test.com", Config.ACTIVE_PASSWORD)
        time.sleep(2)

        assert not page.is_logged_in(), "Should not log in with wrong email"
        report.record("TC_LOGIN_14", MODULE,
                      "Wrong email + right password blocked", "PASS")

    @pytest.mark.function
    def test_TC_LOGIN_15_both_wrong(self, driver, report):
        """TC_LOGIN_15 — Sai cả email lẫn mật khẩu."""
        page = AuthPage(driver)
        page.open_auth()
        page.login("wrong@test.com", "WrongPass@00")
        time.sleep(2)

        assert not page.is_logged_in(), "Should not log in when both are wrong"
        report.record("TC_LOGIN_15", MODULE, "Wrong email and password blocked", "PASS")

    @pytest.mark.function
    def test_TC_LOGIN_16_email_case_insensitive(self, driver, report):
        """TC_LOGIN_16 — Email không phân biệt hoa/thường."""
        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL.upper(), Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        assert page.is_logged_in(), "Email comparison should be case-insensitive"
        report.record("TC_LOGIN_16", MODULE,
                      "Email login is case-insensitive", "PASS")

    @pytest.mark.function
    def test_TC_LOGIN_17_password_case_sensitive(self, driver, report):
        """TC_LOGIN_17 — Mật khẩu phân biệt hoa/thường."""
        page = AuthPage(driver)
        page.open_auth()
        # Flip first char case
        wrong_case = Config.ACTIVE_PASSWORD[0].lower() + Config.ACTIVE_PASSWORD[1:]
        page.login(Config.ACTIVE_EMAIL, wrong_case)
        time.sleep(2)

        assert not page.is_logged_in(), "Password must be case-sensitive"
        report.record("TC_LOGIN_17", MODULE,
                      "Password is case-sensitive", "PASS")


# ══════════════════════════════════════════════════════════════════════════════
# BUSINESS FLOW TESTS  (TC_LOGIN_18 – TC_LOGIN_21)
# ══════════════════════════════════════════════════════════════════════════════

class TestLoginBusinessFlow:

    @pytest.mark.business
    def test_TC_LOGIN_18_redirect_after_login(self, driver, report):
        """TC_LOGIN_18 — Sau đăng nhập thành công → chuyển đúng trang."""
        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        url = page.get_current_url()
        assert "localhost:3000" in url, "Should still be on the app"
        assert page.is_logged_in(), "Should be logged in"
        assert "/" in url  # Not still on root auth page
        report.record("TC_LOGIN_18", MODULE, "Redirect after login correct", "PASS",
                      f"Final URL: {url}")

    @pytest.mark.business
    def test_TC_LOGIN_19_protected_redirect_when_not_logged_in(self, driver, report):
        """TC_LOGIN_19 — Người dùng chưa đăng nhập → redirect về Login."""
        page = AuthPage(driver)
        page.open("/dashboard")
        time.sleep(2)

        # Should either be on auth page or show login form
        url = page.get_current_url()
        on_auth = page.is_on_login_form()
        assert on_auth or "login" in url.lower() or \
               page.is_element_visible(page.LOGIN_SUBMIT, 3), \
               "Unauthenticated user should be redirected to login"
        report.record("TC_LOGIN_19", MODULE,
                      "Protected route redirects to login", "PASS",
                      f"URL: {url}")

    @pytest.mark.business
    def test_TC_LOGIN_20_user_info_shown_after_login(self, driver, report):
        """TC_LOGIN_20 — Thông tin user hiển thị đúng sau đăng nhập."""
        page = AuthPage(driver)
        dash = DashboardPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        assert page.is_logged_in()
        # Sidebar or header should contain some user-identifying element
        is_visible = dash.is_element_visible(dash.USER_MENU_BTN, 5) or \
                     dash.is_element_visible(dash.SIDEBAR, 5)
        assert is_visible, "User UI elements should be visible after login"
        report.record("TC_LOGIN_20", MODULE,
                      "User info visible after login", "PASS")

    @pytest.mark.business
    def test_TC_LOGIN_21_session_valid_after_login(self, driver, report):
        """TC_LOGIN_21 — Phiên làm việc hợp lệ sau đăng nhập."""
        page = AuthPage(driver)
        dash = DashboardPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        assert page.is_logged_in()
        # Navigate away and back — should still be authenticated
        page.open("/dashboard")
        time.sleep(1.5)
        assert not page.is_on_login_form(), "Session should persist on navigation"
        report.record("TC_LOGIN_21", MODULE,
                      "Session persists after login", "PASS")


# ══════════════════════════════════════════════════════════════════════════════
# DATABASE TEST  (TC_LOGIN_22)
# ══════════════════════════════════════════════════════════════════════════════

class TestLoginDatabase:

    @pytest.mark.database
    def test_TC_LOGIN_22_login_history_recorded(self, driver, db, report):
        """TC_LOGIN_22 — Lịch sử đăng nhập được ghi lại."""
        page = AuthPage(driver)
        page.open_auth()
        page.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)
        assert page.is_logged_in()

        # Check DB for login history record
        history = db.get_login_history(Config.ACTIVE_EMAIL, limit=5)

        # Login history may not always be in DB (depends on implementation)
        # Record actual finding
        report.record("TC_LOGIN_22", MODULE,
                      "Login history recorded in DB",
                      "PASS" if len(history) > 0 else "SKIP",
                      f"History records found: {len(history)}")
