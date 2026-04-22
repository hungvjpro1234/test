"""
pages/admin_page.py — Page Object for Admin panel
"""
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class AdminPage(BasePage):

    # ── Navigation ────────────────────────────────────────────────────────────
    ADMIN_NAV     = (By.XPATH, "//a[contains(@href,'admin')]")
    USERS_NAV     = (By.XPATH, "//a[contains(text(),'User') or contains(text(),'Người dùng')]")
    DASHBOARD_NAV = (By.XPATH, "//a[contains(text(),'Dashboard') or contains(text(),'Tổng quan')]")
    LOGIN_HIST_NAV= (By.XPATH, "//a[contains(text(),'Login') or contains(text(),'Đăng nhập')]")

    # ── User list ─────────────────────────────────────────────────────────────
    USER_ROWS       = (By.CSS_SELECTOR, "table tbody tr, [class*='user-row']")
    USER_SEARCH     = (By.CSS_SELECTOR, "input[placeholder*='search' i]")
    LOCK_BTN        = (By.XPATH, ".//button[contains(text(),'Lock') or contains(text(),'Khóa')]")
    UNLOCK_BTN      = (By.XPATH, ".//button[contains(text(),'Unlock') or contains(text(),'Mở khóa')]")
    CREATE_USER_BTN = (By.XPATH, "//button[contains(text(),'Create') or contains(text(),'Tạo')]")

    # ── Dashboard stats ───────────────────────────────────────────────────────
    STAT_TOTAL_USERS  = (By.CSS_SELECTOR, "[class*='stat'] [class*='total-user'], [class*='user-count']")
    STAT_TOTAL_GROUPS = (By.CSS_SELECTOR, "[class*='stat'] [class*='group-count']")

    # ── Login history ─────────────────────────────────────────────────────────
    LOGIN_HIST_ROWS = (By.CSS_SELECTOR, "table tbody tr")
    LOGIN_HIST_USER_COL = (By.XPATH, ".//td[1]")

    # ── Send notification ──────────────────────────────────────────────────────
    SEND_NOTIF_BTN     = (By.XPATH, "//button[contains(text(),'Send') or contains(text(),'Gửi thông báo')]")
    NOTIF_MSG_INPUT    = (By.CSS_SELECTOR, "textarea[name='message'], input[name='message']")
    NOTIF_TARGET_INPUT = (By.CSS_SELECTOR, "input[name='target'], input[placeholder*='user' i]")
    NOTIF_CONFIRM_BTN  = (By.CSS_SELECTOR, "button[type='submit']")

    # ── Access denied ─────────────────────────────────────────────────────────
    ACCESS_DENIED = (By.XPATH, "//p[contains(text(),'Access') or contains(text(),'Forbidden') or contains(text(),'Không có quyền')]")

    def open_admin(self):
        self.open("/admin")
        self.wait.wait_for_page_stable()

    def is_on_admin_page(self) -> bool:
        return "/admin" in self.get_current_url() and \
               not self.is_element_visible(self.ACCESS_DENIED, timeout=3)

    def search_user(self, query: str):
        self.type_text(self.USER_SEARCH, query)

    def get_user_rows(self):
        return self.driver.find_elements(*self.USER_ROWS)

    def lock_user_in_list(self, email: str):
        rows = self.get_user_rows()
        for row in rows:
            if email.lower() in row.text.lower():
                try:
                    btn = row.find_element(*self.LOCK_BTN)
                    btn.click()
                    return True
                except Exception:
                    pass
        return False

    def unlock_user_in_list(self, email: str):
        rows = self.get_user_rows()
        for row in rows:
            if email.lower() in row.text.lower():
                try:
                    btn = row.find_element(*self.UNLOCK_BTN)
                    btn.click()
                    return True
                except Exception:
                    pass
        return False

    def open_login_history(self):
        self.click(self.LOGIN_HIST_NAV)
        self.wait.wait_for_page_stable()

    def get_login_history_rows(self):
        return self.driver.find_elements(*self.LOGIN_HIST_ROWS)

    def is_user_in_login_history(self, email: str) -> bool:
        rows = self.get_login_history_rows()
        for row in rows:
            if email.lower() in row.text.lower():
                return True
        return False
