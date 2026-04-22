#!/usr/bin/env bash
# =============================================================================
# run_tests.sh — One-click Selenium test runner
# =============================================================================
# Usage:
#   chmod +x run_tests.sh
#   ./run_tests.sh                        # Chrome, headed, all tests
#   ./run_tests.sh --headless             # headless Chrome
#   ./run_tests.sh --browser firefox      # Firefox
#   ./run_tests.sh --marks ui             # only UI tests
#   ./run_tests.sh --marks "function or validation"
#   ./run_tests.sh --module test_auth_login
# =============================================================================

set -e

# ── Defaults ──────────────────────────────────────────────────────────────────
BROWSER="chrome"
HEADLESS=""
MARKS=""
MODULE=""
PARALLEL=""
WORKERS=4

# ── Parse args ────────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case $1 in
    --browser)   BROWSER="$2";  shift 2 ;;
    --headless)  HEADLESS="--headless"; shift ;;
    --marks)     MARKS="-m $2"; shift 2 ;;
    --module)    MODULE="tests/$2.py"; shift 2 ;;
    --parallel)  PARALLEL="-n $WORKERS"; shift ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

# ── Resolve script directory ───────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "════════════════════════════════════════════════"
echo "  🧪 Todo List App — Selenium Test Suite"
echo "  Browser : $BROWSER $HEADLESS"
echo "  Marks   : ${MARKS:-all}"
echo "  Module  : ${MODULE:-all}"
echo "════════════════════════════════════════════════"
echo ""

# ── Create venv if needed ─────────────────────────────────────────────────────
if [ ! -d ".venv" ]; then
  echo "📦 Creating virtual environment..."
  python3 -m venv .venv
fi
source .venv/bin/activate

# ── Install dependencies ──────────────────────────────────────────────────────
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# ── Create required directories ───────────────────────────────────────────────
mkdir -p reports/screenshots test_data

# ── Step 1: Generate test data ────────────────────────────────────────────────
echo ""
echo "📝 Generating test data (Excel)..."
python scripts/generate_test_data.py

# ── Step 2: Seed test accounts ────────────────────────────────────────────────
echo ""
echo "🌱 Seeding test accounts into MongoDB..."
python scripts/seed_test_accounts.py

# ── Step 3: Run tests ─────────────────────────────────────────────────────────
echo ""
echo "🚀 Running tests..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Define colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

pytest \
  ${MODULE:-tests/} \
  $MARKS \
  $PARALLEL \
  --browser="$BROWSER" \
  $HEADLESS \
  --html="reports/report_${TIMESTAMP}.html" \
  --self-contained-html \
  --color=yes \
  -v \
  2>&1 | tee "reports/run_${TIMESTAMP}.log"

PYTEST_EXIT=$?

# ── Step 4: Generate final Excel + HTML report ────────────────────────────────
echo ""
echo "📊 Generating final report..."
python scripts/generate_report.py

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════"
if [ $PYTEST_EXIT -eq 0 ]; then
  echo -e "  ${GREEN}✅ ALL TESTS PASSED${NC}"
elif [ $PYTEST_EXIT -eq 1 ]; then
  echo -e "  ${RED}❌ SOME TESTS FAILED — check reports/${NC}"
else
  echo -e "  ${RED}⚠️  Test run interrupted (exit=$PYTEST_EXIT)${NC}"
fi
echo "  📁 Reports → $SCRIPT_DIR/reports/"
echo "════════════════════════════════════════════════"
echo ""

exit $PYTEST_EXIT
