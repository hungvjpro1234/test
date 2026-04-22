"""
pages/auth_page.py — Page Object for Login / Register / Forgot-Password screens
"""
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class AuthPage(BasePage):
    """
    The app renders all auth screens on the root path ('/').
    The UI switches between login / register / forgot-password
    without URL changes — it's a single-page component.
    """

    # ── Common ────────────────────────────────────────────────────────────────
    LANG_BUTTON      = (By.CSS_SELECTOR, "button.flex.items-center.gap-2")
    LANG_DROPDOWN    = (By.CSS_SELECTOR, "div.absolute.bottom-full")

    # ── Login form ────────────────────────────────────────────────────────────
    LOGIN_EMAIL    = (By.CSS_SELECTOR, "form input[type='email']")
    LOGIN_PASSWORD = (By.CSS_SELECTOR, "form input[type='password']")
    LOGIN_SUBMIT   = (By.CSS_SELECTOR, "form button[type='submit']")
    LOGIN_GOOGLE   = (By.CSS_SELECTOR, "button svg path[fill='#4285F4']")
    FORGOT_LINK    = (By.XPATH, "//button[contains(text(),'Forgot') or contains(text(),'Quên')]")
    SIGNUP_LINK    = (By.XPATH, "//button[contains(text(),'Sign up') or contains(text(),'Đăng ký')]")

    # Login error
    EMAIL_ERROR    = (By.XPATH, "//input[@type='email']/../..//p[contains(@class,'text-red')]")
    PASSWORD_ERROR = (By.XPATH, "//input[@type='password']/../..//p[contains(@class,'text-red')]")
    SUBMIT_ERROR   = (By.CSS_SELECTOR, "div.bg-red-50 p, div.bg-red-50")

    # Password toggle
    TOGGLE_PASSWORD = (By.CSS_SELECTOR, "button[type='button'] svg.w-5")

    # ── Register form ─────────────────────────────────────────────────────────
    REG_EMAIL      = (By.CSS_SELECTOR, "form input[type='email']")
    REG_FIRST_NAME = (By.XPATH, "//input[@placeholder='First name' or @placeholder='Tên']")
    REG_LAST_NAME  = (By.XPATH, "//input[@placeholder='Last name' or @placeholder='Họ']")
    REG_PASSWORD   = (By.CSS_SELECTOR, "form input[type='password']")
    REG_TERMS      = (By.CSS_SELECTOR, "input[type='checkbox']")
    REG_SUBMIT     = (By.CSS_SELECTOR, "form button[type='submit']")
    LOGIN_LINK     = (By.XPATH, "//button[contains(text(),'Sign in') or contains(text(),'Đăng nhập')][not(@type='submit')]")
    REG_ERROR_SUBMIT = (By.CSS_SELECTOR, "div.bg-red-50 p")

    # ── Forgot Password form ──────────────────────────────────────────────────
    FORGOT_EMAIL_INPUT = (By.CSS_SELECTOR, "form input[type='email']")
    FORGOT_SEND_BTN    = (By.CSS_SELECTOR, "form button[type='submit']")
    CODE_INPUTS        = (By.CSS_SELECTOR, "input[maxlength='1']")
    VERIFY_BTN         = (By.CSS_SELECTOR, "button[type='submit']")
    NEW_PASSWORD_INPUT = (By.CSS_SELECTOR, "input[type='password']:first-of-type")
    CONFIRM_PWD_INPUT  = (By.XPATH, "(//input[@type='password'])[2]")
    RESET_PWD_BTN      = (By.CSS_SELECTOR, "button[type='submit']")
    BACK_TO_LOGIN_BTN  = (By.XPATH, "//button[contains(text(),'Back') or contains(text(),'Quay lại')]")

    # ── Post-login indicators ─────────────────────────────────────────────────
    DASHBOARD_INDICATOR = (By.CSS_SELECTOR, "[class*='dashboard'], [class*='sidebar'], [class*='AppInterface']")
    USER_AVATAR   = (By.CSS_SELECTOR, "img[alt*='avatar'], [class*='avatar'], [class*='user-menu']")

    def open_auth(self):
        self.open("/")
        self.wait.wait_for_page_stable()

    # ── Login actions ─────────────────────────────────────────────────────────
    def login(self, email: str, password: str):
        self.type_text(self.LOGIN_EMAIL, email)
        self.type_text(self.LOGIN_PASSWORD, password)
        self.click(self.LOGIN_SUBMIT)

    def click_forgot_password(self):
        self.click(self.FORGOT_LINK)

    def click_go_to_register(self):
        self.click(self.SIGNUP_LINK)

    def toggle_password_visibility(self):
        """Click the eye icon on the password field."""
        toggles = self.driver.find_elements(By.CSS_SELECTOR, "button[type='button']")
        for btn in toggles:
            if btn.find_elements(By.CSS_SELECTOR, "svg"):
                # The toggle button is inside the password input container
                parent = btn.find_element(By.XPATH, "..")
                if parent.find_elements(By.CSS_SELECTOR, "input[type='password'], input[type='text']"):
                    btn.click()
                    return

    def get_login_email_error(self) -> str:
        try:
            return self.get_text(self.EMAIL_ERROR)
        except Exception:
            return ""

    def get_login_password_error(self) -> str:
        try:
            return self.get_text(self.PASSWORD_ERROR)
        except Exception:
            return ""

    def get_submit_error(self) -> str:
        try:
            return self.get_text(self.SUBMIT_ERROR)
        except Exception:
            return self.get_toast_text(timeout=4)

    # ── Register actions ──────────────────────────────────────────────────────
    def register(self, email: str, first_name: str, last_name: str,
                 password: str, agree_terms: bool = True):
        self.type_text(self.REG_EMAIL, email)
        self.type_text(self.REG_FIRST_NAME, first_name)
        self.type_text(self.REG_LAST_NAME, last_name)
        self.type_text(self.REG_PASSWORD, password)
        if agree_terms:
            checkbox = self.driver.find_element(*self.REG_TERMS)
            if not checkbox.is_selected():
                checkbox.click()
        self.click(self.REG_SUBMIT)

    def click_go_to_login(self):
        self.click(self.LOGIN_LINK)

    def get_reg_submit_error(self) -> str:
        try:
            return self.get_text(self.REG_ERROR_SUBMIT)
        except Exception:
            return self.get_toast_text(timeout=4)

    # ── Forgot password actions ───────────────────────────────────────────────
    def request_password_reset(self, email: str):
        self.type_text(self.FORGOT_EMAIL_INPUT, email)
        self.click(self.FORGOT_SEND_BTN)

    def enter_reset_code(self, code: str):
        inputs = self.driver.find_elements(*self.CODE_INPUTS)
        for i, digit in enumerate(code[:len(inputs)]):
            inputs[i].clear()
            inputs[i].send_keys(digit)

    def submit_reset_code(self):
        self.click(self.VERIFY_BTN)

    def enter_new_password(self, password: str, confirm: str):
        self.type_text(self.NEW_PASSWORD_INPUT, password)
        self.type_text(self.CONFIRM_PWD_INPUT, confirm)
        self.click(self.RESET_PWD_BTN)

    # ── State checks ──────────────────────────────────────────────────────────
    def is_on_login_form(self) -> bool:
        return self.is_element_visible(self.LOGIN_SUBMIT, timeout=3)

    def is_logged_in(self) -> bool:
        from utils.config import Config
        import time
        time.sleep(1.5)
        url = self.get_current_url().lower()
        return "/dashboard" in url or "/admin" in url or "dashboard" in url or \
               self.is_element_visible(self.DASHBOARD_INDICATOR, timeout=6)

    def is_register_form_visible(self) -> bool:
        return self.is_element_visible(self.REG_FIRST_NAME, timeout=4)

    def is_forgot_form_visible(self) -> bool:
        return self.is_element_visible(self.FORGOT_SEND_BTN, timeout=4)
