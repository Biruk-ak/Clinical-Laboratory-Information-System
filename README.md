# Clinical Laboratory Information System (LIS)

Enterprise-grade Laboratory Information System for specimen accessioning, test ordering, instrument workflows, results validation, quality control, clinical reporting, and operational analytics.

Built for hospitals, reference labs, and multi-facility networks that need reliable turnaround tracking, auditability, and clear clinician delivery channels.

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API examples](#api-examples)
- [Testing](#testing)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License & author](#license--author)

---

## Features

| Domain | Capabilities |
|---|---|
| **Samples** | Accessioning, chain of custody, facility-scoped search |
| **Tests** | Catalog, panels, priority, turnaround targets |
| **Equipment** | Analyzer inventory, maintenance and calibration records |
| **Results** | Entry, validation, critical-value handling, amendments |
| **Doctors** | Ordering physician directory and specialty tracking |
| **Hospitals** | Facilities, departments, and service agreements |
| **Quality Control** | QC lots, assay performance, failure signaling |
| **Reports** | Clinical report metadata and delivery channels |
| **Analytics** | Workload, TAT, utilization, and KPI scoring |
| **Orders / Patients / Billing / Inventory / Auth / Notifications** | Supporting operational modules |

---

## Architecture

```text
┌─────────────────┐     /api/*      ┌──────────────────┐
│  React + TS UI  │ ───────────────▶│   Go REST API    │
│  (Vite / Nginx) │                 │   (Chi router)   │
└─────────────────┘                 └────────┬─────────┘
                                             │
                                             ▼
                                    ┌──────────────────┐
                                    │   PostgreSQL     │
                                    └──────────────────┘
```

- **Frontend:** TypeScript + React (Vite), proxied to the API in development
- **Backend:** Go REST API with domain models, repositories, services, and handlers
- **Data:** PostgreSQL with per-domain SQL migrations
- **Ops:** Docker Compose for API, web, and database

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript, React 18, React Router, Vite, Vitest |
| Backend | Go 1.22, Chi, pgx, UUID |
| Database | PostgreSQL 16 |
| Containers | Docker, Docker Compose, Nginx |

---

## Repository structure

```text
.
├── backend/                 # Go REST API
│   ├── cmd/api/             # Application entrypoint
│   ├── internal/            # Models, repositories, services, handlers
│   └── migrations/          # SQL schemas
├── frontend/                # React + TypeScript web app
│   └── src/                 # Pages, components, API clients, tests
├── docker/                  # Dockerfiles and Nginx config
├── docs/                    # Module docs and changelogs
├── scripts/                 # Tooling helpers
├── docker-compose.yml
├── CONTRIBUTING.md
└── README.md
```

---

## Prerequisites

- Docker Engine + Docker Compose **or**
- Go **1.22+**, Node.js **20+**, and PostgreSQL **16+** for local runs

---

## Installation

### Option A — Docker Compose (recommended)

```bash
git clone git@github.com:Biruk-ak/Clinical-Laboratory-Information-System.git
cd Clinical-Laboratory-Information-System

docker compose up --build
```

Services:

| Service | URL |
|---|---|
| Web UI | http://localhost:5173 |
| API health | http://localhost:8080/api/health |
| PostgreSQL | `localhost:5432` (user/password/db: `lis` / `lis` / `clinical_lis`) |

Stop:

```bash
docker compose down
```

### Option B — Local development

**1. Database**

```bash
# Example with Docker only for Postgres
docker run --name lis-pg -e POSTGRES_USER=lis -e POSTGRES_PASSWORD=lis \
  -e POSTGRES_DB=clinical_lis -p 5432:5432 -d postgres:16-alpine
```

Apply SQL migrations from `backend/migrations/` as needed for your environment.

**2. API**

```bash
cd backend
go mod download
export DATABASE_URL="postgres://lis:lis@localhost:5432/clinical_lis?sslmode=disable"
export HTTP_ADDR=":8080"
go run ./cmd/api
```

**3. Frontend**

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8080`.

---

## Usage

1. Open the web UI at http://localhost:5173
2. Use the sidebar to open a domain workspace (Samples, Tests, Results, QC, …)
3. Confirm API liveness:

```bash
curl -s http://localhost:8080/api/health
```

Expected response:

```json
{"service":"clinical-lis-api","status":"ok"}
```

---

## API examples

List sample records for a facility:

```bash
curl -s "http://localhost:8080/api/samples/v01?facility_id=fac-1&limit=20"
```

Create a sample record:

```bash
curl -s -X POST http://localhost:8080/api/samples/v01 \
  -H "Content-Type: application/json" \
  -H "X-User-ID: tech-001" \
  -d '{
    "external_code": "ACC-2026-000042",
    "display_name": "CBC whole blood",
    "status": "active",
    "priority": 20,
    "facility_id": "fac-1",
    "notes": "Fasting not required"
  }'
```

Search by external code prefix:

```bash
curl -s "http://localhost:8080/api/samples/v01/search?facility_id=fac-1&q=ACC-2026"
```

Archive (soft-delete) a record:

```bash
curl -s -X DELETE http://localhost:8080/api/samples/v01/<id> \
  -H "X-User-ID: supervisor-001"
```

Similar REST patterns exist for Tests, Equipment, Results, Doctors, Hospitals, Quality Control, Reports, Analytics, and supporting modules under `/api/<module>/vXX`.

---

## Testing

### Backend

```bash
cd backend
go test ./...
```

### Frontend

```bash
cd frontend
npm test
npm run build
```

---

## Configuration

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `postgres://lis:lis@localhost:5432/clinical_lis?sslmode=disable` | Postgres connection string |
| `HTTP_ADDR` | `:8080` | API listen address |

Never commit secrets. Use `.env` locally (ignored by Git) or your orchestrator’s secret store in production.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for clone, setup, branch, and pull-request guidelines.  
Use the issue and PR templates under [`.github/`](.github/).

---

## License & author

Maintained by **Biruk-ak** — `birukaklilu0110@gmail.com`

Repository: https://github.com/Biruk-ak/Clinical-Laboratory-Information-System
