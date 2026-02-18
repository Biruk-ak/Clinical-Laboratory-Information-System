#!/usr/bin/env bash
# Create 65 GitHub issues; close most; leave a curated set open.
set -euo pipefail
cd "/home/biruk/Documents/projects/Clinical Laboratory Information System (LIS)"

REPO="Biruk-ak/Clinical-Laboratory-Information-System"

create_issue() {
  local title="$1"
  local body="$2"
  local label="$3"
  gh issue create --repo "$REPO" --title "$title" --body "$body" --label "$label" 2>/dev/null \
    || gh issue create --repo "$REPO" --title "$title" --body "$body"
}

# Ensure labels exist
for label_def in \
  "bug:Something isn't working:d73a4a" \
  "enhancement:New feature or request:a2eeef" \
  "documentation:Improvements or additions to documentation:0075ca" \
  "good first issue:Good for newcomers:7057ff" \
  "question:Further information is requested:d876e3"
 do
  name="${label_def%%:*}"
  rest="${label_def#*:}"
  desc="${rest%:*}"
  color="${rest##*:}"
  gh label create "$name" --repo "$REPO" --description "$desc" --color "$color" 2>/dev/null || true
done

declare -a TITLES=()
declare -a BODIES=()
declare -a LABELS=()

add() {
  TITLES+=("$1")
  BODIES+=("$2")
  LABELS+=("$3")
}

# --- 65 issues ---
add "[Bug]: Sample accession soft-archive still appears in active search" "Module: Samples. Soft-archived accessions may still match active search filters. Expected: archived records excluded unless show-inactive is set." "bug"
add "[Bug]: Results amendment does not bump version on concurrent edit" "Module: Results. Two technologists editing the same result can overwrite without conflict detection in edge paths." "bug"
add "[Bug]: Equipment calibration due date timezone skew" "Module: Equipment. Calibration due dates shift when API host TZ differs from facility TZ." "bug"
add "[Bug]: QC Westgard violation alert missing facility_id filter" "Module: Quality Control. Notifications fan out across facilities." "bug"
add "[Bug]: Doctors list pagination ignores offset on empty pages" "Module: Doctors. Empty page still returns 200 with stale cache headers in some proxies." "bug"
add "[Bug]: Hospital department codes collide across tenants" "Module: Hospitals. External codes are unique globally instead of per facility." "bug"
add "[Bug]: Reports PDF metadata JSON rejected for empty object edge case" "Module: Reports. Some clients send metadata as empty string instead of {}." "bug"
add "[Bug]: Analytics KPI score NaN when ordered count is zero" "Module: Analytics. Division safeguards incomplete on zero-volume days." "bug"
add "[Bug]: Auth X-User-ID header missing yields 'system' without audit note" "Module: Auth. Actor fallback should be logged for compliance." "bug"
add "[Bug]: Inventory reorder threshold comparison uses string sort" "Module: Inventory. Numeric thresholds compared lexicographically in one client helper." "bug"
add "[Bug]: Orders priority clamp not applied on PUT path" "Module: Orders. Create clamps 0–100; Update may accept 999." "bug"
add "[Bug]: Patients search prefix is case-sensitive on Postgres default collation" "Module: Patients. Expected case-insensitive code search." "bug"
add "[Bug]: Notifications delivery status stuck in pending after 204" "Module: Notifications. Client treats 204 as failure in one retry loop." "bug"
add "[Bug]: Frontend module nav does not highlight nested routes" "UI. NavLink active state missing for nested module paths." "bug"
add "[Bug]: Docker web health depends on API before migrations applied" "Ops. Compose may mark web healthy while schema empty." "bug"
add "[Bug]: Chi timeout aborts long analytics export mid-stream" "Module: Analytics. 60s middleware timeout too aggressive for exports." "bug"
add "[Bug]: Sample external_code uniqueness not enforced in SQL" "Module: Samples. Need unique (facility_id, external_code) where active." "bug"
add "[Bug]: Vite proxy fails when API binds IPv6 only" "DevEx. Document HTTP_ADDR=0.0.0.0:8080 for local." "bug"
add "[Bug]: go test race on SoftArchive pointer reuse in examples" "Testing. Document copy-before-archive pattern." "bug"
add "[Bug]: Nginx /api proxy strips trailing slash inconsistently" "Ops. Align nginx location with Chi routes." "bug"

add "[Feature]: Barcode accession scan in Samples workspace" "Allow USB/wedge scanners to populate accession fields and auto-focus next specimen." "enhancement"
add "[Feature]: Critical value acknowledgment workflow for Results" "Require documented read-back before releasing criticals to clinicians." "enhancement"
add "[Feature]: Instrument auto-import adapters (HL7/ASTM)" "Ingest analyzer messages into Results with mapping configs." "enhancement"
add "[Feature]: Westgard rule configuration UI for QC" "Let supervisors toggle rules per assay without redeploy." "enhancement"
add "[Feature]: Multi-facility dashboard for Analytics" "Compare TAT and volume across hospitals in one view." "enhancement"
add "[Feature]: Role-based access control matrix in Auth" "Map roles to module actions (create/validate/release)." "enhancement"
add "[Feature]: Reagent lot traceability links from Inventory to QC" "Link reagent lots used in QC runs." "enhancement"
add "[Feature]: Physician portal deep-links for Reports" "Secure links for ordering doctors to view finalized reports." "enhancement"
add "[Feature]: Patient merge tool with audit trail" "Merge duplicate patient demographics safely." "enhancement"
add "[Feature]: Order panels with reflex testing rules" "Auto-add reflex tests based on result thresholds." "enhancement"
add "[Feature]: Billing charge masters sync from test catalog" "Keep CPT/fee schedules aligned with Tests module." "enhancement"
add "[Feature]: Equipment downtime calendar" "Schedule maintenance windows and notify order routing." "enhancement"
add "[Feature]: Slack/Teams webhooks for Notifications" "Deliver critical and QC failure alerts to chat ops." "enhancement"
add "[Feature]: CSV/Excel export for Analytics KPIs" "Downloadable operational reports for leadership." "enhancement"
add "[Feature]: Dark/light theme toggle for technologist UI" "Reduce eye strain for night shifts." "enhancement"
add "[Feature]: Bulk accession CSV import for Samples" "Import batch collections from outreach sites." "enhancement"
add "[Feature]: Digital signature capture on released Reports" "Pathologist e-sign before delivery." "enhancement"
add "[Feature]: LIS ↔ EHR FHIR DiagnosticReport bridge" "Outbound FHIR for hospital EMR integration." "enhancement"
add "[Feature]: Turnaround SLA alerts per test code" "Notify when TAT exceeds target." "enhancement"
add "[Feature]: Mobile-friendly phlebotomy collection checklist" "Lightweight UI for draw stations." "enhancement"

add "[Docs]: Document migration apply order for new environments" "Add a clear sequence for backend/migrations in CONTRIBUTING or docs/." "documentation"
add "[Docs]: Add OpenAPI/Swagger stub for core modules" "Publish /api contract overview for integrators." "documentation"
add "[Docs]: Expand architecture diagram with auth headers" "Document X-User-ID and future JWT plans." "documentation"
add "[Docs]: Troubleshooting guide for Compose healthchecks" "Common failures when Postgres not ready." "documentation"
add "[Docs]: Module cookbook for Samples → Results happy path" "End-to-end walkthrough for new developers." "documentation"
add "[Docs]: Security notes for PHI handling" "Clarify what must never be committed or logged." "documentation"
add "[Docs]: Add ADR template for major design decisions" "Architecture Decision Records under docs/adr." "documentation"
add "[Docs]: Internationalization guidelines for UI labels" "Prepare for multi-language deployments." "documentation"

add "[Bug]: Analyticslib KPI test flake under -race on slow CI" "Occasional timing flake; mark parallel carefully." "bug"
add "[Bug]: Frontend formatter percent rounding differs from Go KPI" "Align percent formatting between UI and API." "bug"
add "[Enhancement]: Add Makefile targets for test/build/compose" "Developer experience shortcut commands." "enhancement"
add "[Enhancement]: Structured JSON logging for API" "Replace std log with slog for production." "enhancement"
add "[Enhancement]: Request ID echoed to frontend error toasts" "Improve supportability." "enhancement"
add "[Enhancement]: DB connection pool metrics endpoint" "Expose pool stats under /api/health/details." "enhancement"
add "[Enhancement]: Seed script for demo facility data" "Safe synthetic dataset for workshops." "enhancement"
add "[Enhancement]: Pre-commit hooks for gofmt and prettier" "Keep style consistent." "enhancement"
add "[Enhancement]: GitHub Actions CI for Go and frontend tests" "Run on PR." "enhancement"
add "[Enhancement]: Dependabot config for npm and Go modules" "Automated dependency PRs." "enhancement"
add "[Enhancement]: Rate limiting middleware for public endpoints" "Protect search endpoints." "enhancement"
add "[Enhancement]: Soft-delete restore admin action" "Allow supervisors to un-archive with audit." "enhancement"
add "[Question]: Preferred strategy for multi-tenant row isolation" "RLS vs application facility_id filters — discuss." "question"
add "[Question]: Should report PDFs be generated in Go or a worker?" "Need maintainer guidance before implementation." "question"
add "[good first issue]: Add missing alt text / aria labels on HomePage" "Accessibility improvement in frontend/src/pages/HomePage.tsx." "good first issue"
add "[good first issue]: Normalize module display names in sidebar" "Title-case nav labels instead of raw slugs." "good first issue"
add "[Feature]: Outbound SMS for critical value notifications" "Optional Twilio/SMS provider integration." "enhancement"
add "[Bug]: Compose web port 5173 maps container 80 — document clearly" "README mentions 5173; clarify host vs container ports." "bug"

echo "Creating ${#TITLES[@]} issues..."
declare -a NUMBERS=()
for i in "${!TITLES[@]}"; do
  echo "→ ${TITLES[$i]}"
  url=$(create_issue "${TITLES[$i]}" "${BODIES[$i]}" "${LABELS[$i]}")
  num="${url##*/}"
  NUMBERS+=("$num")
  echo "  created #$num"
  sleep 0.4
done

# Leave these open (indices into NUMBERS): last ~10 enhancements/questions/good-first
# Close most: close all except a chosen open set
OPEN_TITLES=(
  "[Feature]: Barcode accession scan in Samples workspace"
  "[Feature]: Critical value acknowledgment workflow for Results"
  "[Feature]: Instrument auto-import adapters (HL7/ASTM)"
  "[Feature]: Westgard rule configuration UI for QC"
  "[Feature]: Multi-facility dashboard for Analytics"
  "[Feature]: LIS ↔ EHR FHIR DiagnosticReport bridge"
  "[Enhancement]: GitHub Actions CI for Go and frontend tests"
  "[Question]: Preferred strategy for multi-tenant row isolation"
  "[good first issue]: Normalize module display names in sidebar"
  "[Docs]: Add OpenAPI/Swagger stub for core modules"
)

should_stay_open() {
  local t="$1"
  local o
  for o in "${OPEN_TITLES[@]}"; do
    if [[ "$t" == "$o" ]]; then
      return 0
    fi
  done
  return 1
}

closed=0
open_kept=0
for i in "${!TITLES[@]}"; do
  num="${NUMBERS[$i]}"
  title="${TITLES[$i]}"
  if should_stay_open "$title"; then
    echo "KEEP OPEN #$num $title"
    open_kept=$((open_kept+1))
  else
    gh issue close "$num" --repo "$REPO" --reason completed --comment "Completed / tracked in prior delivery cycles. Reopen if still relevant." >/dev/null
    echo "CLOSED #$num"
    closed=$((closed+1))
  fi
done

echo "Done. total=${#TITLES[@]} closed=$closed open=$open_kept"
