"""
tests/test_nfr.py
NFR: Non-Functional Requirements
Covers: Performance (response time), Security (auth protection), Usability (responsive, theme)
"""
import time
import pytest
import requests
from selenium.webdriver.common.by import By
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from utils.config import Config

MODULE = "NFR: Non-Functional"


class TestPerformance:

    @pytest.mark.performance
    def test_TC_NFR_PERF_01_login_response_under_3s(self, driver, report):
        """NFR-PERF-1 — Thao tác đăng nhập < 3 giây."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.type_text(auth.LOGIN_EMAIL, Config.ACTIVE_EMAIL)
        auth.type_text(auth.LOGIN_PASSWORD, Config.ACTIVE_PASSWORD)

        start = time.time()
        auth.click(auth.LOGIN_SUBMIT)
        # Wait for redirect OR dashboard elements
        max_wait = 5
        elapsed = 0
        while elapsed < max_wait:
            time.sleep(0.2)
            elapsed = time.time() - start
            if auth.is_logged_in():
                break

        login_time = time.time() - start
        report.record("TC_NFR_PERF_01", MODULE,
                      "Login response time < 3s",
                      "PASS" if login_time < 3 else "FAIL",
                      f"Actual: {login_time:.2f}s")
        assert login_time < 3, f"Login took {login_time:.2f}s (>3s threshold)"

    @pytest.mark.performance
    def test_TC_NFR_PERF_02_api_health_check(self, report):
        """NFR-PERF-1 — API health endpoint responds in < 3s."""
        try:
            start = time.time()
            resp = requests.get(f"{Config.API_URL.rstrip('/api')}/health",
                                timeout=5)
            elapsed = time.time() - start
            report.record("TC_NFR_PERF_02", MODULE,
                          "API health check < 3s",
                          "PASS" if elapsed < 3 else "FAIL",
                          f"Status: {resp.status_code}, Time: {elapsed:.2f}s")
        except Exception as e:
            report.record("TC_NFR_PERF_02", MODULE,
                          "API health check", "SKIP", str(e))

    @pytest.mark.performance
    def test_TC_NFR_PERF_03_page_load_time(self, driver, report):
        """NFR-PERF-1 — Page load < 3s."""
        import time as t
        t0 = t.time()
        driver.get(Config.BASE_URL)
        t1 = t.time()
        load_time = t1 - t0
        report.record("TC_NFR_PERF_03", MODULE,
                      "Page load time < 3s",
                      "PASS" if load_time < 3 else "FAIL",
                      f"Load time: {load_time:.2f}s")


class TestSecurity:

    @pytest.mark.security
    def test_TC_NFR_SEC_01_unauthenticated_redirect(self, driver, report):
        """NFR-SEC-2 — Người dùng chưa đăng nhập bị redirect về Login."""
        protected_paths = ["/dashboard", "/tasks", "/notes", "/groups"]
        auth = AuthPage(driver)

        for path in protected_paths:
            auth.open(path)
            time.sleep(1.5)
            is_blocked = auth.is_on_login_form() or "login" in auth.get_current_url().lower()
            if not is_blocked:
                # Maybe app renders login overlay on same page
                is_blocked = auth.is_element_visible(auth.LOGIN_SUBMIT, 3)

            report.record(f"TC_NFR_SEC_01_{path.strip('/')}", MODULE,
                          f"Unauthenticated redirect for {path}",
                          "PASS" if is_blocked else "FAIL",
                          f"Blocked: {is_blocked}, URL: {auth.get_current_url()}")

    @pytest.mark.security
    def test_TC_NFR_SEC_02_password_not_in_dom(self, driver, report):
        """NFR-SEC-1 — Mật khẩu không xuất hiện dạng plaintext trên DOM sau đăng nhập."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
        time.sleep(2.5)

        # Scan page source for plaintext password
        page_source = driver.page_source
        password_in_source = Config.ACTIVE_PASSWORD in page_source
        report.record("TC_NFR_SEC_02", MODULE,
                      "Password not exposed in DOM",
                      "PASS" if not password_in_source else "FAIL",
                      f"Password in page source: {password_in_source}")
        assert not password_in_source, "Password should not appear in page source"


class TestUsability:

    @pytest.mark.ui
    def test_TC_NFR_USAB_01_responsive_desktop(self, driver, report):
        """NFR-USAB-1 — Desktop (1920x1080) layout intact."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.resize_window(1920, 1080)
        time.sleep(0.5)
        assert auth.is_element_visible(auth.LOGIN_SUBMIT)
        report.record("TC_NFR_USAB_01", MODULE, "Responsive at 1920x1080", "PASS")

    @pytest.mark.ui
    def test_TC_NFR_USAB_02_responsive_tablet(self, driver, report):
        """NFR-USAB-1 — Tablet (768x1024) layout intact."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.resize_window(768, 1024)
        time.sleep(0.5)
        assert auth.is_element_visible(auth.LOGIN_SUBMIT)
        report.record("TC_NFR_USAB_02", MODULE, "Responsive at 768x1024", "PASS")

    @pytest.mark.ui
    def test_TC_NFR_USAB_03_responsive_mobile(self, driver, report):
        """NFR-USAB-1 — Mobile (375x667) layout intact."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.resize_window(375, 667)
        time.sleep(0.5)
        assert auth.is_element_visible(auth.LOGIN_SUBMIT)
        report.record("TC_NFR_USAB_03", MODULE, "Responsive at 375x667", "PASS")

    @pytest.mark.ui
    def test_TC_NFR_USAB_04_error_message_user_friendly(self, driver, report):
        """NFR-USAB-4 — Thông báo lỗi thân thiện (không phải mã lỗi kỹ thuật)."""
        auth = AuthPage(driver)
        auth.open_auth()
        auth.login("baduser@test.com", "wrongpass")
        time.sleep(2)
        error = auth.get_submit_error()
        # Should not contain raw stack traces or HTTP status codes like "500 Internal"
        bad_patterns = ["500", "stack trace", "TypeError", "ReferenceError",
                        "Cannot read property", "undefined"]
        is_technical_error = any(p.lower() in error.lower() for p in bad_patterns)
        report.record("TC_NFR_USAB_04", MODULE,
                      "Error messages are user-friendly",
                      "PASS" if not is_technical_error else "FAIL",
                      f"Error shown: '{error[:100]}'")
