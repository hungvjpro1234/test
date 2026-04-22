"""
pages/dashboard_page.py — Page Object for main app (Dashboard / Sidebar)
"""
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class DashboardPage(BasePage):

    # ── Sidebar / Nav ─────────────────────────────────────────────────────────
    SIDEBAR           = (By.CSS_SELECTOR, "[class*='sidebar'], [class*='Sidebar'], aside")
    USER_MENU_BTN     = (By.CSS_SELECTOR, "[class*='user-menu'], [class*='avatar'], [class*='profile']")
    LOGOUT_BTN        = (By.XPATH, "//button[contains(text(),'Logout') or contains(text(),'Đăng xuất') or contains(text(),'Sign out')]")
    NOTIFICATIONS_BTN = (By.CSS_SELECTOR, "[class*='notification'], button[aria-label*='notification']")
    GROUP_SELECTOR    = (By.CSS_SELECTOR, "[class*='GroupSelector'], [class*='group-selector']")

    # ── Task section ──────────────────────────────────────────────────────────
    TASK_NAV_LINK  = (By.XPATH, "//a[contains(@href,'task') or contains(text(),'Task') or contains(text(),'Công việc')]")
    CREATE_TASK_BTN = (By.XPATH, "//button[contains(text(),'Create') or contains(text(),'Tạo') or contains(text(),'+')]")
    TASK_TITLE_INPUT = (By.CSS_SELECTOR, "input[placeholder*='title' i], input[placeholder*='tiêu đề' i]")
    TASK_SUBMIT_BTN  = (By.CSS_SELECTOR, "button[type='submit'], button.btn-primary")
    TASK_LIST        = (By.CSS_SELECTOR, "[class*='task-list'] li, [class*='TaskList'] li, [class*='task-item']")
    TASK_SEARCH      = (By.CSS_SELECTOR, "input[placeholder*='search' i], input[placeholder*='tìm' i]")

    # ── Group section ─────────────────────────────────────────────────────────
    CREATE_GROUP_BTN  = (By.XPATH, "//button[contains(text(),'Create group') or contains(text(),'Tạo nhóm') or contains(text(),'New group')]")
    GROUP_NAME_INPUT  = (By.CSS_SELECTOR, "input[placeholder*='group' i], input[placeholder*='nhóm' i], input[name='name']")
    GROUP_SUBMIT_BTN  = (By.CSS_SELECTOR, "button[type='submit'], form button.btn-primary")
    GROUP_LIST        = (By.CSS_SELECTOR, "[class*='group-item'], [class*='GroupItem']")

    # ── Notes section ─────────────────────────────────────────────────────────
    NOTE_NAV_LINK    = (By.XPATH, "//a[contains(text(),'Note') or contains(text(),'Ghi chú')]")
    CREATE_NOTE_BTN  = (By.XPATH, "//button[contains(text(),'New note') or contains(text(),'Ghi chú mới')]")
    NOTE_TITLE_INPUT = (By.CSS_SELECTOR, "input[placeholder*='note' i], input[placeholder*='ghi chú' i]")
    NOTE_LIST        = (By.CSS_SELECTOR, "[class*='note-item'], [class*='NoteItem']")

    # ── Chat section ──────────────────────────────────────────────────────────
    CHAT_NAV_LINK = (By.XPATH, "//a[contains(text(),'Chat') or contains(text(),'Nhóm')]")
    CHAT_INPUT    = (By.CSS_SELECTOR, "textarea[placeholder*='message' i], input[placeholder*='message' i], textarea[placeholder*='tin nhắn' i]")
    CHAT_SEND_BTN = (By.CSS_SELECTOR, "button[type='submit'], button[aria-label*='send' i]")
    CHAT_MESSAGES = (By.CSS_SELECTOR, "[class*='message-item'], [class*='MessageItem'], [class*='chat-message']")

    # ── Notifications ─────────────────────────────────────────────────────────
    NOTIF_BADGE       = (By.CSS_SELECTOR, "[class*='badge'], [class*='unread-count']")
    NOTIF_LIST        = (By.CSS_SELECTOR, "[class*='notification-item'], [class*='NotificationItem']")
    MARK_ALL_READ_BTN = (By.XPATH, "//button[contains(text(),'Mark all') or contains(text(),'Đánh dấu tất cả')]")

    # ── Profile ───────────────────────────────────────────────────────────────
    PROFILE_NAV    = (By.XPATH, "//a[contains(text(),'Profile') or contains(text(),'Hồ sơ')]")
    PROFILE_NAME   = (By.CSS_SELECTOR, "input[name='name'], input[placeholder*='name' i]")
    SAVE_PROFILE   = (By.XPATH, "//button[contains(text(),'Save') or contains(text(),'Lưu')]")

    # ── Admin (admin-role only) ───────────────────────────────────────────────
    ADMIN_NAV      = (By.XPATH, "//a[contains(@href,'admin') or contains(text(),'Admin')]")

    # ── Loading state ─────────────────────────────────────────────────────────
    LOADING_SPINNER = (By.CSS_SELECTOR, "[class*='spinner'], [class*='loading']")

    def wait_for_dashboard(self):
        """Wait until the main app shell is visible."""
        self.wait.wait_for_loading_to_disappear(self.LOADING_SPINNER, timeout=15)
        self.wait.until_visible(self.SIDEBAR, timeout=12)

    def logout(self):
        try:
            self.click(self.USER_MENU_BTN)
        except Exception:
            pass
        self.click(self.LOGOUT_BTN)

    def open_notifications(self):
        self.click(self.NOTIFICATIONS_BTN)

    def get_unread_notification_count(self) -> int:
        try:
            text = self.get_text(self.NOTIF_BADGE)
            return int(text) if text.isdigit() else 0
        except Exception:
            return 0

    def mark_all_notifications_read(self):
        self.click(self.MARK_ALL_READ_BTN)

    def open_profile(self):
        try:
            self.click(self.USER_MENU_BTN)
        except Exception:
            pass
        try:
            self.click(self.PROFILE_NAV)
        except Exception:
            self.open("/profile")

    def create_task(self, title: str):
        self.click(self.CREATE_TASK_BTN)
        self.type_text(self.TASK_TITLE_INPUT, title)
        self.click(self.TASK_SUBMIT_BTN)

    def is_task_in_list(self, title: str) -> bool:
        tasks = self.get_all_texts(self.TASK_LIST)
        return any(title.lower() in t.lower() for t in tasks)

    def create_group(self, name: str):
        self.click(self.CREATE_GROUP_BTN)
        self.type_text(self.GROUP_NAME_INPUT, name)
        self.click(self.GROUP_SUBMIT_BTN)

    def is_group_in_list(self, name: str) -> bool:
        groups = self.get_all_texts(self.GROUP_LIST)
        return any(name.lower() in g.lower() for g in groups)

    def send_chat_message(self, message: str):
        self.type_text(self.CHAT_INPUT, message)
        self.click(self.CHAT_SEND_BTN)

    def is_message_in_chat(self, message: str) -> bool:
        messages = self.get_all_texts(self.CHAT_MESSAGES)
        return any(message.lower() in m.lower() for m in messages)
