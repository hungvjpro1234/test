"""
conftest.py — Pytest configuration and shared fixtures
Project: Todo List App — Selenium System Tests
"""
import pytest
import os
import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager

from utils.db_helper import DBHelper
from utils.report_helper import ReportHelper
from utils.config import Config

# ─── Pytest CLI Options ───────────────────────────────────────────────────────
def pytest_addoption(parser):
    parser.addoption("--browser", default="chrome", help="Browser: chrome | firefox")
    parser.addoption("--headless", action="store_true", default=False, help="Run headless")
    parser.addoption("--base-url", default=Config.BASE_URL, help="Frontend base URL")
    parser.addoption("--env", default="local", help="Environment: local | staging")


# ─── Session-scoped fixtures ─────────────────────────────────────────────────
@pytest.fixture(scope="session")
def config(request):
    return {
        "browser":   request.config.getoption("--browser"),
        "headless":  request.config.getoption("--headless"),
        "base_url":  request.config.getoption("--base-url"),
        "env":       request.config.getoption("--env"),
    }


@pytest.fixture(scope="session")
def db(config):
    """MongoDB connection usable by all tests in the session."""
    helper = DBHelper()
    yield helper
    helper.close()


@pytest.fixture(scope="session")
def report():
    return ReportHelper()


# ─── Function-scoped driver fixture ──────────────────────────────────────────
@pytest.fixture(scope="function")
def driver(config, request):
    """
    Returns a WebDriver instance.
    - Supports Chrome and Firefox.
    - Cleans up (quit) after each test.
    - Takes a screenshot on failure.
    """
    browser = config["browser"].lower()
    headless = config["headless"]
    base_url = config["base_url"]

    if browser == "chrome":
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-extensions")
        options.add_argument("--ignore-certificate-errors")
        drv = webdriver.Chrome(options=options)
    elif browser == "firefox":
        options = webdriver.FirefoxOptions()
        if headless:
            options.add_argument("--headless")
        options.add_argument("--width=1920")
        options.add_argument("--height=1080")
        drv = webdriver.Firefox(options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    drv.implicitly_wait(Config.IMPLICIT_WAIT)
    drv.set_page_load_timeout(Config.PAGE_LOAD_TIMEOUT)
    drv.get(base_url)

    yield drv

    # Screenshot on failure
    if request.node.rep_call.failed if hasattr(request.node, "rep_call") else False:
        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        name = request.node.name.replace("/", "_").replace(" ", "_")
        screenshot_dir = os.path.join(os.path.dirname(__file__), "reports", "screenshots")
        os.makedirs(screenshot_dir, exist_ok=True)
        drv.save_screenshot(os.path.join(screenshot_dir, f"FAIL_{name}_{ts}.png"))

    drv.quit()


# ─── Hook: capture failure status before teardown ────────────────────────────
@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)


# ─── Rollback fixture ─────────────────────────────────────────────────────────
@pytest.fixture(scope="function")
def rollback(db):
    """
    Collects rollback actions. Tests register lambdas; on teardown the helper
    executes them in reverse order (LIFO), ensuring clean DB state.
    """
    actions = []

    class RollbackContext:
        def register(self, fn):
            actions.append(fn)

    ctx = RollbackContext()
    yield ctx

    for action in reversed(actions):
        try:
            action()
        except Exception as e:
            print(f"[ROLLBACK ERROR] {e}")
