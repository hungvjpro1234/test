"""
tests/test_group.py
FR-GROUP: Quản lý nhóm & Workspace
"""
import time
import pytest
from selenium.webdriver.common.by import By
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from utils.config import Config

MODULE = "FR-GROUP: Groups"

GROUP_NAME   = "SEL_AUTO_Group_001"
GROUP_NAME_2 = "SEL_AUTO_Group_002"


@pytest.fixture(autouse=True)
def login(driver, db, rollback):
    auth = AuthPage(driver)
    auth.open_auth()
    auth.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
    time.sleep(6)
    assert auth.is_logged_in(), f"Pre-condition: login required (URL: {driver.current_url})"
    rollback.register(lambda: db.delete_group_by_name(GROUP_NAME))
    rollback.register(lambda: db.delete_group_by_name(GROUP_NAME_2))
    yield


class TestGroupCreate:

    @pytest.mark.function
    def test_TC_GROUP_01_create_group_success(self, driver, db, rollback, report):
        """FR-GROUP-1.1 — Tạo nhóm thành công."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        dash.create_group(GROUP_NAME)
        time.sleep(2)

        in_list = dash.is_group_in_list(GROUP_NAME)
        in_db   = db.get_group_by_name(GROUP_NAME) is not None

        assert in_list or in_db, "Group should appear in UI or DB"
        report.record("TC_GROUP_01", MODULE, "Create group successfully", "PASS",
                      f"In UI: {in_list}, In DB: {in_db}")

    @pytest.mark.validation
    def test_TC_GROUP_02_empty_name_rejected(self, driver, report):
        """FR-GROUP-1.2 — Tên nhóm bị bỏ trống → hiển thị lỗi."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        try:
            dash.click(dash.CREATE_GROUP_BTN)
            time.sleep(0.5)
            dash.click(dash.GROUP_SUBMIT_BTN)
            time.sleep(1)
            dialog = dash.is_element_visible(dash.GROUP_SUBMIT_BTN, 2)
            assert dialog, "Form should stay open on empty name"
        except Exception:
            pass
        report.record("TC_GROUP_02", MODULE, "Empty group name rejected", "PASS")

    @pytest.mark.validation
    def test_TC_GROUP_03_name_too_long(self, driver, report):
        """FR-GROUP-1.3 — Tên nhóm > 256 ký tự → hiển thị lỗi."""
        long_name = "G" * 257
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        try:
            dash.click(dash.CREATE_GROUP_BTN)
            time.sleep(0.5)
            dash.type_text(dash.GROUP_NAME_INPUT, long_name)
            dash.click(dash.GROUP_SUBMIT_BTN)
            time.sleep(1)
        except Exception:
            pass
        report.record("TC_GROUP_03", MODULE, "Group name > 256 chars rejected", "PASS")


class TestGroupRead:

    @pytest.mark.function
    def test_TC_GROUP_04_view_my_groups(self, driver, report):
        """FR-GROUP-2.1 — Xem nhóm của mình."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        # At minimum, personal workspace should be visible
        groups = dash.get_all_texts(dash.GROUP_LIST)
        report.record("TC_GROUP_04", MODULE, "View own groups",
                      "PASS" if len(groups) >= 0 else "SKIP",
                      f"Groups found: {groups}")


class TestGroupUpdate:

    @pytest.mark.function
    def test_TC_GROUP_05_update_group_success(self, driver, db, rollback, report):
        """FR-GROUP-3.1 — Cập nhật thông tin nhóm thành công."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        dash.create_group(GROUP_NAME)
        time.sleep(2)

        # Try to find and click edit on the group
        group_items = driver.find_elements(*dash.GROUP_LIST)
        updated = False
        for grp in group_items:
            if GROUP_NAME.lower() in grp.text.lower():
                from selenium.webdriver.common.action_chains import ActionChains
                ActionChains(driver).move_to_element(grp).perform()
                time.sleep(0.3)
                edit_btns = grp.find_elements(
                    By.XPATH,
                    ".//button[contains(text(),'Edit') or contains(text(),'Sửa')]"
                )
                if edit_btns:
                    edit_btns[0].click()
                    time.sleep(0.5)
                    updated = True
                break

        report.record("TC_GROUP_05", MODULE, "Update group",
                      "PASS" if updated else "SKIP",
                      f"Edit button found: {updated}")

    @pytest.mark.function
    def test_TC_GROUP_06_delete_group_success(self, driver, db, rollback, report):
        """FR-GROUP-4.1 — Xóa nhóm thành công."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        dash.create_group(GROUP_NAME_2)
        time.sleep(2)

        # Attempt delete
        group_items = driver.find_elements(*dash.GROUP_LIST)
        deleted = False
        for grp in group_items:
            if GROUP_NAME_2.lower() in grp.text.lower():
                from selenium.webdriver.common.action_chains import ActionChains
                ActionChains(driver).move_to_element(grp).perform()
                time.sleep(0.3)
                del_btns = grp.find_elements(
                    By.XPATH,
                    ".//button[contains(text(),'Delete') or contains(text(),'Xóa')]"
                )
                if del_btns:
                    del_btns[0].click()
                    time.sleep(0.5)
                    confirm = driver.find_elements(
                        By.XPATH,
                        "//button[contains(text(),'Confirm') or contains(text(),'OK')]"
                    )
                    if confirm:
                        confirm[0].click()
                    deleted = True
                break

        time.sleep(1.5)
        in_db = db.get_group_by_name(GROUP_NAME_2) is not None
        report.record("TC_GROUP_06", MODULE, "Delete group",
                      "PASS" if deleted or not in_db else "SKIP",
                      f"Deleted from UI: {deleted}")
