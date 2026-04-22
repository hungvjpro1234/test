"""
config.py — Central configuration for Selenium test suite
"""
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env.test"))

class Config:
    # ── Application URLs ─────────────────────────────────────────────────────
    BASE_URL       = os.getenv("BASE_URL",    "http://localhost:3000")
    API_URL        = os.getenv("API_URL",     "http://localhost:8080/api")

    # ── MongoDB ──────────────────────────────────────────────────────────────
    MONGODB_URI    = os.getenv("MONGODB_URI", "mongodb+srv://goawaysuee:Nguyen%400712@localhost0712.8o4p9c0.mongodb.net/")
    DB_NAME        = os.getenv("DB_NAME",     "test")

    # ── Timeouts (seconds) ───────────────────────────────────────────────────
    IMPLICIT_WAIT     = int(os.getenv("IMPLICIT_WAIT",    "8"))
    EXPLICIT_WAIT     = int(os.getenv("EXPLICIT_WAIT",   "25"))
    PAGE_LOAD_TIMEOUT = int(os.getenv("PAGE_LOAD_TIMEOUT","30"))

    # ── Test Accounts ────────────────────────────────────────────────────────
    ACTIVE_EMAIL    = os.getenv("ACTIVE_EMAIL",    "active@test.com")
    ACTIVE_PASSWORD = os.getenv("ACTIVE_PASSWORD", "Abc@1234")

    LOCKED_EMAIL    = os.getenv("LOCKED_EMAIL",    "locked@test.com")
    LOCKED_PASSWORD = os.getenv("LOCKED_PASSWORD", "Abc@1234")

    ADMIN_EMAIL     = os.getenv("ADMIN_EMAIL",     "admin@test.com")
    ADMIN_PASSWORD  = os.getenv("ADMIN_PASSWORD",  "Admin@1234")

    EXISTING_EMAIL  = os.getenv("EXISTING_EMAIL",  "existing@test.com")

    # ── Test Data File ───────────────────────────────────────────────────────
    TEST_DATA_FILE  = os.path.join(BASE_DIR, "test_data", "test_data.xlsx")

    # ── Reports ──────────────────────────────────────────────────────────────
    REPORT_DIR      = os.path.join(BASE_DIR, "reports")
    SCREENSHOT_DIR  = os.path.join(REPORT_DIR, "screenshots")
