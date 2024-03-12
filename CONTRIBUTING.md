# Contributing to Clinical Laboratory Information System (LIS)

Thanks for your interest in improving this project. This guide explains how to clone, run, develop, and submit pull requests.

## Code of conduct (short)

- Be respectful and constructive in issues and reviews
- Prefer clear reproductions and focused diffs
- Do not commit secrets, credentials, or production patient data

## Development setup

### 1. Fork and clone

```bash
git clone git@github.com:<your-username>/Clinical-Laboratory-Information-System.git
cd Clinical-Laboratory-Information-System
git remote add upstream git@github.com:Biruk-ak/Clinical-Laboratory-Information-System.git
```

### 2. Run with Docker Compose

```bash
docker compose up --build
```

- Web: http://localhost:5173  
- API: http://localhost:8080/api/health  

### 3. Or run services locally

**API (Go 1.22+)**

```bash
cd backend
go mod download
export DATABASE_URL="postgres://lis:lis@localhost:5432/clinical_lis?sslmode=disable"
go run ./cmd/api
```

**Frontend (Node 20+)**

```bash
cd frontend
npm install
npm run dev
```

## Project layout (where to work)

| Area | Path |
|---|---|
| API entrypoint | `backend/cmd/api` |
| Domain logic | `backend/internal/{models,repository,service,handler}` |
| SQL migrations | `backend/migrations` |
| Web UI | `frontend/src` |
| Compose / Docker | `docker-compose.yml`, `docker/` |

## Branching and commits

1. Sync with upstream `main`
2. Create a topic branch:

```bash
git checkout -b feature/short-description
# or
git checkout -b fix/short-description
```

3. Keep commits focused and descriptive (why over what)
4. Do not include `Co-authored-by` trailers unless maintainers ask for them

## Coding guidelines

- **Go:** keep handlers thin; put rules in services; validate before persist
- **TypeScript/React:** prefer clear components and typed API clients
- **SQL:** additive migrations; avoid destructive changes without discussion
- **Tests:** add or update unit tests for behavior you change

### Run checks before opening a PR

```bash
# Backend
cd backend && go test ./... && go build -o /tmp/lis-api ./cmd/api

# Frontend
cd frontend && npm test && npm run build
```

## Issues

- Search existing issues before opening a new one
- Use the **Bug report** or **Feature request** templates under `.github/ISSUE_TEMPLATE/`
- For bugs: include steps, expected vs actual, environment, and logs (no secrets)

## Pull requests

1. Push your branch to your fork (or a branch on this repo if you have write access)
2. Open a PR against `main`
3. Fill out `.github/pull_request_template.md`
4. Link related issue(s) with `Closes #123` when applicable
5. Keep the PR scoped — large unrelated changes are harder to review

### Review expectations

Maintainers look for:

- Clear problem statement and test plan
- Passing tests / build
- No accidental secrets or generated noise unrelated to the change
- Sensible API and UI consistency with existing modules

## Security and PHI

This system models clinical laboratory workflows. **Do not** commit:

- Real patient identifiers or PHI
- API keys, tokens, or private connection strings
- Production dumps

Report suspected security issues privately to the maintainer when possible instead of filing a public issue with exploit details.

## Questions

Open a GitHub Discussion (if enabled) or an issue with the question label context.  
Maintainer: **Biruk-ak** (`birukaklilu0110@gmail.com`)
