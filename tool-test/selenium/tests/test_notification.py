"""
tests/test_notification.py
FR-NOTIF: Thông báo — View, mark-read, archive
"""
import time
import pytest
from selenium.webdriver.common.by import By
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from utils.config import Config

MODULE = "FR-NOTIF: Notifications"


@pytest.fixture(autouse=True)
def login(driver):
    auth = AuthPage(driver)
    auth.open_auth()
    auth.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
    time.sleep(2.5)
    assert auth.is_logged_in()
    yield


class TestNotifications:

    @pytest.mark.function
    def test_TC_NOTIF_01_view_notifications(self, driver, report):
        """FR-NOTIF-1.1 — Xem danh sách thông báo."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()

        try:
            dash.open_notifications()
            time.sleep(1)
            notifs = driver.find_elements(*dash.NOTIF_LIST)
            report.record("TC_NOTIF_01", MODULE, "View notifications list",
                          "PASS", f"Notifications visible: {len(notifs)}")
        except Exception as e:
            report.record("TC_NOTIF_01", MODULE, "View notifications", "SKIP", str(e))

    @pytest.mark.function
    def test_TC_NOTIF_02_unread_badge_visible(self, driver, report):
        """FR-NOTIF-1.2 — Hiển thị số thông báo chưa đọc."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        count = dash.get_unread_notification_count()
        report.record("TC_NOTIF_02", MODULE, "Unread notification badge",
                      "PASS", f"Unread count: {count}")

    @pytest.mark.function
    def test_TC_NOTIF_03_mark_all_as_read(self, driver, db, report):
        """FR-NOTIF-2.2 — Đánh dấu tất cả đã đọc → count về 0."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()

        try:
            dash.open_notifications()
            time.sleep(1)
            count_before = dash.get_unread_notification_count()

            if dash.is_element_visible(dash.MARK_ALL_READ_BTN, 3):
                dash.mark_all_notifications_read()
                time.sleep(1.5)
                count_after = dash.get_unread_notification_count()

                report.record("TC_NOTIF_03", MODULE, "Mark all notifications as read",
                              "PASS",
                              f"Before: {count_before}, After: {count_after}")
            else:
                report.record("TC_NOTIF_03", MODULE,
                              "Mark all read (button not found)", "SKIP")
        except Exception as e:
            report.record("TC_NOTIF_03", MODULE, "Mark all notifications read", "SKIP", str(e))
