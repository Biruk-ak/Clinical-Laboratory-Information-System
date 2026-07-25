# Clinical Laboratory Information System (LIS)

Enterprise web application for clinical laboratory operations.

## Stack

- **Frontend:** TypeScript + React (Vite)
- **Backend:** Go REST API (Chi)
- **Data:** PostgreSQL
- **Ops:** Docker Compose + Dockerfiles

## Domains

Samples · Tests · Equipment · Results · Doctors · Hospitals · Quality Control · Reports · Analytics · Patients · Orders · Billing · Inventory · Auth · Notifications

## Quick start

### Docker (recommended)

```bash
docker compose up --build
```

- Frontend: http://localhost:5173  
- API health: http://localhost:8080/api/health

### Local development

**API**

```bash
cd backend
go mod download
go run ./cmd/api
```

**Web**

```bash
cd frontend
npm install
npm run dev
```

## Tests

```bash
# Go
cd backend && go test ./...

# Frontend
cd frontend && npm test
```

## Author

Biruk-ak \<birukaklilu0110@gmail.com\>
