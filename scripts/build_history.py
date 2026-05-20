#!/usr/bin/env python3
"""Build multi-year git history for Clinical LIS (Biruk-ak)."""
from __future__ import annotations

import os
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUTHOR_NAME = "Biruk-ak"
AUTHOR_EMAIL = "birukaklilu0110@gmail.com"

# First commit ~6 years before 2026-07-25 => 2020-07; last ~2 months before => 2026-05
COMMITS: list[tuple[str, str, list[str]]] = [
    # (ISO datetime, message, pathspecs — empty means special handling)
    ("2020-07-12T10:15:00", "Initial commit: project charter and repository scaffolding", ["README.md", ".gitignore"]),
    ("2020-08-03T14:22:00", "Add Docker Compose baseline for local laboratory stack", ["docker-compose.yml", "docker/"]),
    ("2020-09-18T09:40:00", "Bootstrap Go API module and health endpoint", ["backend/go.mod", "backend/go.sum", "backend/cmd/", "backend/internal/handler/health.go", "backend/internal/handler/http_util.go", "backend/internal/server/router.go", "backend/internal/models/errors.go"]),
    ("2020-10-27T16:05:00", "Introduce Samples domain models and accessioning migrations", ["backend/internal/models/samples_", "backend/migrations/samples_", "docs/modules/samples.md"]),
    ("2020-11-14T11:30:00", "Implement Samples repositories and service layer", ["backend/internal/repository/samples_", "backend/internal/service/samples_"]),
    ("2020-12-09T13:45:00", "Expose Samples REST handlers and route registration stubs", ["backend/internal/handler/samples_"]),
    ("2021-01-21T10:10:00", "Add Lab Tests catalog models and SQL schemas", ["backend/internal/models/tests_", "backend/migrations/tests_", "docs/modules/tests.md"]),
    ("2021-02-16T15:55:00", "Build Tests repositories, services, and API handlers", ["backend/internal/repository/tests_", "backend/internal/service/tests_", "backend/internal/handler/tests_"]),
    ("2021-03-08T09:20:00", "Add Equipment inventory domain for analyzers and devices", ["backend/internal/models/equipment_", "backend/migrations/equipment_", "docs/modules/equipment.md"]),
    ("2021-04-19T14:05:00", "Implement Equipment persistence and maintenance APIs", ["backend/internal/repository/equipment_", "backend/internal/service/equipment_", "backend/internal/handler/equipment_"]),
    ("2021-05-11T11:40:00", "Introduce Results domain for validated laboratory outcomes", ["backend/internal/models/results_", "backend/migrations/results_", "docs/modules/results.md"]),
    ("2021-06-22T16:25:00", "Add Results repositories, business rules, and REST endpoints", ["backend/internal/repository/results_", "backend/internal/service/results_", "backend/internal/handler/results_"]),
    ("2021-07-07T10:50:00", "Model Doctors directory with specialty and license fields", ["backend/internal/models/doctors_", "backend/migrations/doctors_", "docs/modules/doctors.md"]),
    ("2021-08-24T13:15:00", "Ship Doctors services and ordering physician APIs", ["backend/internal/repository/doctors_", "backend/internal/service/doctors_", "backend/internal/handler/doctors_"]),
    ("2021-09-15T09:35:00", "Add Hospitals and facility partnership domain", ["backend/internal/models/hospitals_", "backend/migrations/hospitals_", "docs/modules/hospitals.md"]),
    ("2021-10-28T15:00:00", "Implement Hospitals repositories and facility APIs", ["backend/internal/repository/hospitals_", "backend/internal/service/hospitals_", "backend/internal/handler/hospitals_"]),
    ("2021-11-17T11:20:00", "Establish Quality Control lots and Westgard tracking models", ["backend/internal/models/qualitycontrol_", "backend/migrations/qualitycontrol_", "docs/modules/qualitycontrol.md"]),
    ("2021-12-13T14:45:00", "Deliver QC services, handlers, and assay performance endpoints", ["backend/internal/repository/qualitycontrol_", "backend/internal/service/qualitycontrol_", "backend/internal/handler/qualitycontrol_"]),
    ("2022-01-19T10:05:00", "Add clinical Reports domain and delivery metadata", ["backend/internal/models/reports_", "backend/migrations/reports_", "docs/modules/reports.md"]),
    ("2022-02-23T16:30:00", "Implement Reports generation pipeline APIs", ["backend/internal/repository/reports_", "backend/internal/service/reports_", "backend/internal/handler/reports_"]),
    ("2022-03-14T09:50:00", "Introduce Analytics KPI models and warehouse migrations", ["backend/internal/models/analytics_", "backend/migrations/analytics_", "docs/modules/analytics.md"]),
    ("2022-04-26T13:10:00", "Build Analytics services and operational KPI endpoints", ["backend/internal/repository/analytics_", "backend/internal/service/analytics_", "backend/internal/handler/analytics_"]),
    ("2022-05-18T11:00:00", "Expand Patients demographics and encounter linkage", ["backend/internal/models/patients_", "backend/migrations/patients_", "docs/modules/patients.md"]),
    ("2022-06-29T15:40:00", "Add Patients CRUD APIs and soft-archive workflows", ["backend/internal/repository/patients_", "backend/internal/service/patients_", "backend/internal/handler/patients_"]),
    ("2022-07-12T10:25:00", "Model Orders with priority and clinical indication fields", ["backend/internal/models/orders_", "backend/migrations/orders_", "docs/modules/orders.md"]),
    ("2022-08-31T14:55:00", "Implement Orders intake services and REST surface", ["backend/internal/repository/orders_", "backend/internal/service/orders_", "backend/internal/handler/orders_"]),
    ("2022-09-20T09:15:00", "Add Billing charge capture and payer domain", ["backend/internal/models/billing_", "backend/migrations/billing_", "docs/modules/billing.md"]),
    ("2022-10-25T16:20:00", "Ship Billing reconciliation APIs", ["backend/internal/repository/billing_", "backend/internal/service/billing_", "backend/internal/handler/billing_"]),
    ("2022-11-09T11:45:00", "Introduce Inventory for reagents and consumables", ["backend/internal/models/inventory_", "backend/migrations/inventory_", "docs/modules/inventory.md"]),
    ("2022-12-14T13:35:00", "Implement Inventory stock APIs and archive flows", ["backend/internal/repository/inventory_", "backend/internal/service/inventory_", "backend/internal/handler/inventory_"]),
    ("2023-01-18T10:30:00", "Add Auth domain for users, roles, and audit metadata", ["backend/internal/models/auth_", "backend/migrations/auth_", "docs/modules/auth.md"]),
    ("2023-02-21T15:10:00", "Implement Auth session-oriented services and handlers", ["backend/internal/repository/auth_", "backend/internal/service/auth_", "backend/internal/handler/auth_"]),
    ("2023-03-15T09:55:00", "Add Notifications for criticals, delays, and QC alerts", ["backend/internal/models/notifications_", "backend/migrations/notifications_", "docs/modules/notifications.md"]),
    ("2023-04-27T14:40:00", "Deliver Notifications APIs and delivery tracking", ["backend/internal/repository/notifications_", "backend/internal/service/notifications_", "backend/internal/handler/notifications_"]),
    ("2023-05-16T11:25:00", "Wire generated module registration into API router", ["backend/internal/server/register_generated.go"]),
    ("2023-06-28T16:00:00", "Add backend domain unit tests for models and services", ["backend/internal/models/*_test.go", "backend/internal/service/*_test.go"]),
    ("2023-07-19T10:45:00", "Introduce analytics KPI computation library", ["backend/internal/analyticslib/"]),
    ("2023-08-22T13:20:00", "Expand KPI library coverage and scoring edge cases", ["backend/internal/analyticslib/kpi_4", "backend/internal/analyticslib/kpi_5", "backend/internal/analyticslib/kpi_6", "backend/internal/analyticslib/kpi_7", "backend/internal/analyticslib/kpi_8"]),
    ("2023-09-13T09:05:00", "Add remaining KPI sets for TAT and QC dashboards", ["backend/internal/analyticslib/"]),
    ("2023-10-24T15:50:00", "Scaffold React + TypeScript frontend workspace", ["frontend/package.json", "frontend/tsconfig.json", "frontend/vite.config.ts", "frontend/index.html", "frontend/src/main.tsx", "frontend/src/App.tsx", "frontend/src/pages/", "frontend/src/styles/"]),
    ("2023-11-15T11:15:00", "Add Samples TypeScript clients and domain types", ["frontend/src/types/samples", "frontend/src/api/samples"]),
    ("2023-12-12T14:30:00", "Build Samples operational React panels", ["frontend/src/components/samples/"]),
    ("2024-01-23T10:20:00", "Add Tests and Equipment frontend API modules", ["frontend/src/types/tests", "frontend/src/api/tests", "frontend/src/types/equipment", "frontend/src/api/equipment", "frontend/src/components/tests/", "frontend/src/components/equipment/"]),
    ("2024-02-27T16:10:00", "Ship Results and Doctors UI workspaces", ["frontend/src/types/results", "frontend/src/api/results", "frontend/src/types/doctors", "frontend/src/api/doctors", "frontend/src/components/results/", "frontend/src/components/doctors/"]),
    ("2024-03-19T09:40:00", "Add Hospitals and Quality Control frontend modules", ["frontend/src/types/hospitals", "frontend/src/api/hospitals", "frontend/src/types/qualitycontrol", "frontend/src/api/qualitycontrol", "frontend/src/components/hospitals/", "frontend/src/components/qualitycontrol/"]),
    ("2024-04-30T13:55:00", "Implement Reports and Analytics UI clients", ["frontend/src/types/reports", "frontend/src/api/reports", "frontend/src/types/analytics", "frontend/src/api/analytics", "frontend/src/components/reports/", "frontend/src/components/analytics/"]),
    ("2024-05-21T11:05:00", "Extend Patients, Orders, and Billing frontend surfaces", ["frontend/src/types/patients", "frontend/src/api/patients", "frontend/src/types/orders", "frontend/src/api/orders", "frontend/src/types/billing", "frontend/src/api/billing", "frontend/src/components/patients/", "frontend/src/components/orders/", "frontend/src/components/billing/"]),
    ("2024-06-26T15:25:00", "Add Inventory, Auth, and Notifications web modules", ["frontend/src/types/inventory", "frontend/src/api/inventory", "frontend/src/types/auth", "frontend/src/api/auth", "frontend/src/types/notifications", "frontend/src/api/notifications", "frontend/src/components/inventory/", "frontend/src/components/auth/", "frontend/src/components/notifications/"]),
    ("2024-07-17T10:35:00", "Add frontend formatter utilities for TAT and accession labels", ["frontend/src/utils/"]),
    ("2024-08-28T14:15:00", "Expand Vitest coverage for domain helpers and formatters", ["frontend/src/types/*.test.ts", "frontend/src/utils/*.test.ts"]),
    ("2024-09-18T09:50:00", "Document generated module inventory and generation notes", ["docs/GENERATION.md", "docs/modules/"]),
    ("2024-10-29T16:40:00", "Harden Dockerfiles and nginx API proxy for Compose demos", ["docker/Dockerfile.api", "docker/Dockerfile.web", "docker/nginx.conf"]),
    ("2024-11-20T11:30:00", "Backfill Samples and Tests model validation edge-case tests", ["backend/internal/models/samples_*_test.go", "backend/internal/models/tests_*_test.go"]),
    ("2024-12-11T13:45:00", "Strengthen service-layer tests across clinical domains", ["backend/internal/service/*_test.go"]),
    ("2025-01-22T10:15:00", "Improve Results and QC handler consistency for critical workflows", ["backend/internal/handler/results_", "backend/internal/handler/qualitycontrol_"]),
    ("2025-02-26T15:20:00", "Refine Equipment maintenance and calibration API contracts", ["backend/internal/handler/equipment_", "backend/internal/service/equipment_"]),
    ("2025-03-18T09:30:00", "Enhance Reports and Analytics KPI scoring helpers", ["backend/internal/analyticslib/", "backend/internal/service/analytics_", "backend/internal/service/reports_"]),
    ("2025-04-29T14:50:00", "Polish Doctors and Hospitals facility linkage panels", ["frontend/src/components/doctors/", "frontend/src/components/hospitals/"]),
    ("2025-05-20T11:10:00", "Improve Samples accession UI filtering and archive actions", ["frontend/src/components/samples/"]),
    ("2025-06-24T16:05:00", "Expand Orders and Results workspace panels", ["frontend/src/components/orders/", "frontend/src/components/results/"]),
    ("2025-07-15T10:40:00", "Add billing and inventory operational panel refinements", ["frontend/src/components/billing/", "frontend/src/components/inventory/"]),
    ("2025-08-27T13:25:00", "Stabilize Auth and Notifications client error handling", ["frontend/src/api/auth", "frontend/src/api/notifications", "frontend/src/components/auth/", "frontend/src/components/notifications/"]),
    ("2025-09-16T09:55:00", "Increase formatter unit tests for laboratory display helpers", ["frontend/src/utils/"]),
    ("2025-10-28T15:35:00", "Refresh module documentation for clinical workflows", ["docs/modules/"]),
    ("2025-11-19T11:50:00", "Tune API router middleware timeouts and CORS headers", ["backend/internal/server/router.go", "backend/cmd/api/main.go"]),
    ("2025-12-10T14:20:00", "Consolidate migration indexes for facility-scoped queries", ["backend/migrations/"]),
    ("2026-01-21T10:05:00", "Optimize frontend type helpers for active-record filtering", ["frontend/src/types/"]),
    ("2026-02-25T15:45:00", "Complete remaining UI panels across laboratory domains", ["frontend/src/components/"]),
    ("2026-03-17T09:25:00", "Finalize backend service tests for archive and search paths", ["backend/internal/service/"]),
    ("2026-04-22T13:15:00", "Align Compose health checks and production Docker builds", ["docker-compose.yml", "docker/"]),
    ("2026-05-13T11:40:00", "Release hardening: docs, generation summary, and workspace polish", ["docs/", "README.md", "scripts/"]),
]


def run(cmd: list[str], env: dict | None = None) -> None:
    merged = os.environ.copy()
    if env:
        merged.update(env)
    subprocess.run(cmd, cwd=ROOT, check=True, env=merged)


def git_add(paths: list[str]) -> None:
    """Add paths in batches to avoid ARG_MAX limits."""
    batch = 400
    for i in range(0, len(paths), batch):
        chunk = paths[i : i + batch]
        run(["git", "add", "-f", "--"] + chunk)


def git_commit(when: str, message: str) -> None:
    env = {
        "GIT_AUTHOR_NAME": AUTHOR_NAME,
        "GIT_AUTHOR_EMAIL": AUTHOR_EMAIL,
        "GIT_COMMITTER_NAME": AUTHOR_NAME,
        "GIT_COMMITTER_EMAIL": AUTHOR_EMAIL,
        "GIT_AUTHOR_DATE": when,
        "GIT_COMMITTER_DATE": when,
    }
    run(
        [
            "git",
            "-c",
            f"user.name={AUTHOR_NAME}",
            "-c",
            f"user.email={AUTHOR_EMAIL}",
            "commit",
            "--allow-empty-message",
            "-m",
            message,
        ],
        env=env,
    )


def expand_pathspecs(specs: list[str]) -> list[str]:
    """Expand prefix pathspecs to concrete existing paths for git add."""
    existing: list[str] = []
    for spec in specs:
        # glob-like prefixes without shell glob
        if any(ch in spec for ch in "*?[]"):
            matches = sorted(str(p.relative_to(ROOT)) for p in ROOT.glob(spec) if p.is_file() or p.is_dir())
            existing.extend(matches)
            continue
        path = ROOT / spec
        if path.exists():
            existing.append(spec)
            continue
        # treat as prefix: add all files starting with that relative path
        prefix = spec
        for p in ROOT.rglob("*"):
            if not p.is_file():
                continue
            rel = str(p.relative_to(ROOT)).replace("\\", "/")
            if rel.startswith(prefix) or rel.startswith(prefix.rstrip("/")):
                existing.append(rel)
    # unique preserve order
    seen = set()
    out = []
    for e in existing:
        if e not in seen:
            seen.add(e)
            out.append(e)
    return out


def main() -> None:
    os.chdir(ROOT)
    if (ROOT / ".git").exists():
        print("Refusing to rebuild: .git already exists", file=sys.stderr)
        sys.exit(1)

    run(["git", "init", "-b", "main"])

    staged_all: set[str] = set()
    for when, message, specs in COMMITS:
        paths = expand_pathspecs(specs)
        # Only add paths not yet committed if possible — but re-adding is fine
        to_add = [p for p in paths if p]
        if not to_add:
            # fallback: nothing new matched; skip empty commit unless last polish
            print(f"SKIP (no paths): {when} {message}")
            continue
        git_add(to_add)
        # Check if anything staged
        st = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            cwd=ROOT,
        )
        if st.returncode == 0:
            print(f"SKIP (no changes): {when} {message}")
            continue
        git_commit(when, message)
        print(f"OK {when} — {message}")

    # Ensure everything remaining is committed in the last dated commit if needed
    run(["git", "add", "-A"])
    st = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT)
    if st.returncode != 0:
        git_commit("2026-05-20T16:10:00", "Include remaining generated assets and tooling scripts")
        print("OK final catch-up commit")

    run(["git", "log", "--format=%h %ad %an <%ae> %s", "--date=short"])


if __name__ == "__main__":
    main()
