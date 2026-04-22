"""
wait_helper.py — Smart explicit-wait wrappers
"""
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from utils.config import Config


class WaitHelper:
    def __init__(self, driver, timeout=None):
        self.driver = driver
        self.timeout = timeout or Config.EXPLICIT_WAIT

    def _wait(self, timeout=None):
        return WebDriverWait(self.driver, timeout or self.timeout)

    # ── Visibility ────────────────────────────────────────────────────────────
    def until_visible(self, locator, timeout=None):
        return self._wait(timeout).until(EC.visibility_of_element_located(locator))

    def until_clickable(self, locator, timeout=None):
        return self._wait(timeout).until(EC.element_to_be_clickable(locator))

    def until_invisible(self, locator, timeout=None):
        return self._wait(timeout).until(EC.invisibility_of_element_located(locator))

    def until_present(self, locator, timeout=None):
        return self._wait(timeout).until(EC.presence_of_element_located(locator))

    def until_text_in_element(self, locator, text, timeout=None):
        return self._wait(timeout).until(EC.text_to_be_present_in_element(locator, text))

    def until_url_contains(self, url_part, timeout=None):
        return self._wait(timeout).until(EC.url_contains(url_part))

    def until_url_changes(self, current_url, timeout=None):
        return self._wait(timeout).until(EC.url_changes(current_url))

    def until_all_visible(self, locator, timeout=None):
        return self._wait(timeout).until(EC.visibility_of_all_elements_located(locator))

    # ── Safe helpers ──────────────────────────────────────────────────────────
    def is_visible(self, locator, timeout=3) -> bool:
        try:
            self.until_visible(locator, timeout)
            return True
        except TimeoutException:
            return False

    def safe_find(self, locator, timeout=3):
        try:
            return self.until_visible(locator, timeout)
        except TimeoutException:
            return None

    def wait_for_page_stable(self, timeout=10):
        """Wait until document.readyState == complete"""
        self._wait(timeout).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )

    def wait_for_loading_to_disappear(self, loading_locator, timeout=20):
        """Wait for any loading spinner/overlay to disappear."""
        try:
            self.until_invisible(loading_locator, timeout)
        except TimeoutException:
            pass
