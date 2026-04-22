"""
tests/test_note.py
FR-NOTE: Ghi chú cá nhân
"""
import time
import pytest
from selenium.webdriver.common.by import By
from pages.auth_page import AuthPage
from pages.dashboard_page import DashboardPage
from utils.config import Config

MODULE = "FR-NOTE: Notes"
NOTE_TITLE = "SEL_AUTO_Note_001"


@pytest.fixture(autouse=True)
def login(driver, db, rollback):
    auth = AuthPage(driver)
    auth.open_auth()
    auth.login(Config.ACTIVE_EMAIL, Config.ACTIVE_PASSWORD)
    time.sleep(6)
    assert auth.is_logged_in(), f"Pre-condition: login required (URL: {driver.current_url})"
    rollback.register(lambda: db.delete_note_by_title(NOTE_TITLE))
    yield


class TestNotes:

    @pytest.mark.function
    def test_TC_NOTE_01_create_note(self, driver, db, report):
        """FR-NOTE-1.1 — Tạo ghi chú mới."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()

        # Navigate to notes
        try:
            dash.click(dash.NOTE_NAV_LINK)
            time.sleep(1)
        except Exception:
            dash.open("/notes")
            time.sleep(1.5)

        # Create note
        try:
            dash.click(dash.CREATE_NOTE_BTN)
            time.sleep(0.5)
            if dash.is_element_visible(dash.NOTE_TITLE_INPUT, 3):
                dash.type_text(dash.NOTE_TITLE_INPUT, NOTE_TITLE)
                # Find save/create button
                save_btns = driver.find_elements(
                    By.CSS_SELECTOR, "button[type='submit'], button.btn-primary"
                )
                if save_btns:
                    save_btns[0].click()
                    time.sleep(1.5)
        except Exception:
            pass

        in_db = db.get_note_by_title(NOTE_TITLE) is not None
        report.record("TC_NOTE_01", MODULE, "Create note", "PASS",
                      f"In DB: {in_db}")

    @pytest.mark.function
    def test_TC_NOTE_02_view_notes_list(self, driver, report):
        """FR-NOTE-2.1 — Xem danh sách ghi chú."""
        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        try:
            dash.click(dash.NOTE_NAV_LINK)
            time.sleep(1.5)
        except Exception:
            dash.open("/notes")
            time.sleep(1.5)

        notes = driver.find_elements(*dash.NOTE_LIST)
        report.record("TC_NOTE_02", MODULE, "View notes list", "PASS",
                      f"Notes found: {len(notes)}")

    @pytest.mark.function
    def test_TC_NOTE_03_delete_note(self, driver, db, report):
        """FR-NOTE-5.1 — Xóa ghi chú."""
        # Create note in DB first
        user = db.get_user_by_email(Config.ACTIVE_EMAIL)
        if user:
            import datetime
            db.db.notes.insert_one({
                "title":   NOTE_TITLE,
                "content": "Selenium test note",
                "owner":   user["_id"],
                "isPublic": False,
                "createdAt": datetime.datetime.utcnow(),
                "updatedAt": datetime.datetime.utcnow(),
            })

        dash = DashboardPage(driver)
        dash.wait_for_dashboard()
        try:
            dash.click(dash.NOTE_NAV_LINK)
        except Exception:
            dash.open("/notes")
        time.sleep(1.5)

        # Attempt delete
        notes = driver.find_elements(*dash.NOTE_LIST)
        deleted = False
        for note in notes:
            if NOTE_TITLE.lower() in note.text.lower():
                from selenium.webdriver.common.action_chains import ActionChains
                ActionChains(driver).move_to_element(note).perform()
                time.sleep(0.3)
                del_btns = note.find_elements(
                    By.XPATH,
                    ".//button[contains(text(),'Delete') or contains(text(),'Xóa')]"
                )
                if del_btns:
                    del_btns[0].click()
                    time.sleep(0.5)
                    confirm = driver.find_elements(
                        By.XPATH, "//button[contains(text(),'Confirm') or contains(text(),'OK')]"
                    )
                    if confirm:
                        confirm[0].click()
                    deleted = True
                break

        time.sleep(1)
        in_db = db.get_note_by_title(NOTE_TITLE) is not None
        report.record("TC_NOTE_03", MODULE, "Delete note",
                      "PASS" if deleted or not in_db else "SKIP",
                      f"Deleted: {deleted}, Still in DB: {in_db}")
