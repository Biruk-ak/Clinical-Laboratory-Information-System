package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/handler"
	"github.com/biruk-ak/clinical-lis/backend/internal/server"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	addr := env("HTTP_ADDR", ":8080")
	dsn := env("DATABASE_URL", "postgres://lis:lis@localhost:5432/clinical_lis?sslmode=disable")

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalf("db open: %v", err)
	}
	defer db.Close()
	db.SetMaxOpenConns(40)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(30 * time.Minute)

	r := server.NewRouter(db)
	r.Get("/api/health", handler.Health)

	log.Printf("Clinical LIS API listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatal(err)
	}
}

func env(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}
