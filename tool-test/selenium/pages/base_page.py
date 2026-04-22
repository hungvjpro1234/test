"""
pages/base_page.py — Base Page Object with shared helpers
"""
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from utils.wait_helper import WaitHelper
from utils.config import Config


class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait   = WaitHelper(driver)
        self.actions = ActionChains(driver)

    # ── Navigation ────────────────────────────────────────────────────────────
    def open(self, path: str = ""):
        self.driver.get(Config.BASE_URL + path)

    def get_current_url(self) -> str:
        return self.driver.current_url

    def get_title(self) -> str:
        return self.driver.title

    def refresh(self):
        self.driver.refresh()
        self.wait.wait_for_page_stable()

    # ── Interaction ───────────────────────────────────────────────────────────
    def click(self, locator):
        el = self.wait.until_clickable(locator)
        self.driver.execute_script("arguments[0].scrollIntoView({block:'center'});", el)
        el.click()
        return el

    def type_text(self, locator, text: str, clear_first: bool = True):
        el = self.wait.until_visible(locator)
        if clear_first:
            el.clear()
            el.send_keys(Keys.CONTROL + "a")
            el.send_keys(Keys.DELETE)
        el.send_keys(text)
        return el

    def get_text(self, locator) -> str:
        return self.wait.until_visible(locator).text.strip()

    def get_attribute(self, locator, attr: str) -> str:
        return self.wait.until_present(locator).get_attribute(attr)

    def is_element_visible(self, locator, timeout: int = 4) -> bool:
        return self.wait.is_visible(locator, timeout)

    def is_element_present(self, locator) -> bool:
        try:
            self.driver.find_element(*locator)
            return True
        except NoSuchElementException:
            return False

    def get_all_texts(self, locator) -> list[str]:
        elements = self.driver.find_elements(*locator)
        return [e.text.strip() for e in elements]

    # ── Scroll ────────────────────────────────────────────────────────────────
    def scroll_to_element(self, locator):
        el = self.wait.until_present(locator)
        self.driver.execute_script("arguments[0].scrollIntoView({block:'center'});", el)

    def scroll_to_bottom(self):
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # ── Window ────────────────────────────────────────────────────────────────
    def get_window_size(self) -> dict:
        return self.driver.get_window_size()

    def resize_window(self, width: int, height: int):
        self.driver.set_window_size(width, height)

    # ── JS helpers ────────────────────────────────────────────────────────────
    def js_click(self, locator):
        el = self.wait.until_present(locator)
        self.driver.execute_script("arguments[0].click();", el)

    def js_get_value(self, locator) -> str:
        el = self.wait.until_present(locator)
        return self.driver.execute_script("return arguments[0].value;", el)

    # ── Toast / Alert helpers ─────────────────────────────────────────────────
    def get_toast_text(self, timeout: int = 6) -> str:
        """Try multiple common toast/alert patterns."""
        toast_locators = [
            (By.CSS_SELECTOR, "[role='alert']"),
            (By.CSS_SELECTOR, ".toast"),
            (By.CSS_SELECTOR, ".notification"),
            (By.CSS_SELECTOR, "[class*='toast']"),
            (By.CSS_SELECTOR, "[class*='alert']"),
            (By.CSS_SELECTOR, "[class*='snack']"),
        ]
        for loc in toast_locators:
            try:
                el = self.wait.until_visible(loc, timeout=timeout)
                if el and el.text.strip():
                    return el.text.strip()
            except TimeoutException:
                continue
        return ""

    def wait_for_redirect(self, expected_url_part: str, timeout: int = 10):
        self.wait.until_url_contains(expected_url_part, timeout)

    # ── Screenshot ────────────────────────────────────────────────────────────
    def take_screenshot(self, name: str):
        import os, datetime
        ts  = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        dir_ = Config.SCREENSHOT_DIR
        os.makedirs(dir_, exist_ok=True)
        path = os.path.join(dir_, f"{name}_{ts}.png")
        self.driver.save_screenshot(path)
        return path
