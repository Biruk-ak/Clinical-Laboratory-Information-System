package repository


import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
)

// InventoryRecord25Repository persists InventoryRecord25 entities.
type InventoryRecord25Repository struct {
	db *sql.DB
}

// NewInventoryRecord25Repository constructs a repository backed by SQL.
func NewInventoryRecord25Repository(db *sql.DB) *InventoryRecord25Repository {
	return &InventoryRecord25Repository{db: db}
}

// Create inserts a new InventoryRecord25.
func (r *InventoryRecord25Repository) Create(ctx context.Context, rec *models.InventoryRecord25) error {
	const q = `INSERT INTO inventory_25_records (
		id, external_code, display_name, status, priority, facility_id,
		created_by, updated_by, notes, metadata_json, version, is_active, created_at, updated_at
	) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`
	_, err := r.db.ExecContext(ctx, q,
		rec.ID, rec.ExternalCode, rec.DisplayName, rec.Status, rec.Priority, rec.FacilityID,
		rec.CreatedBy, rec.UpdatedBy, rec.Notes, rec.MetadataJSON, rec.Version, rec.IsActive,
		rec.CreatedAt, rec.UpdatedAt,
	)
	return err
}

// GetByID loads a InventoryRecord25 by primary key.
func (r *InventoryRecord25Repository) GetByID(ctx context.Context, id string) (*models.InventoryRecord25, error) {
	const q = `SELECT id, external_code, display_name, status, priority, facility_id,
		created_by, updated_by, notes, metadata_json, version, is_active, created_at, updated_at, archived_at
		FROM inventory_25_records WHERE id = $1`
	row := r.db.QueryRowContext(ctx, q, id)
	var rec models.InventoryRecord25
	var archived sql.NullTime
	err := row.Scan(
		&rec.ID, &rec.ExternalCode, &rec.DisplayName, &rec.Status, &rec.Priority, &rec.FacilityID,
		&rec.CreatedBy, &rec.UpdatedBy, &rec.Notes, &rec.MetadataJSON, &rec.Version, &rec.IsActive,
		&rec.CreatedAt, &rec.UpdatedAt, &archived,
	)
	if err == sql.ErrNoRows {
		return nil, models.ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	if archived.Valid {
		t := archived.Time
		rec.ArchivedAt = &t
	}
	return &rec, nil
}

// List returns paginated active InventoryRecord25 rows for a facility.
func (r *InventoryRecord25Repository) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord25, error) {
	const q = `SELECT id, external_code, display_name, status, priority, facility_id,
		created_by, updated_by, notes, metadata_json, version, is_active, created_at, updated_at, archived_at
		FROM inventory_25_records
		WHERE facility_id = $1 AND is_active = true
		ORDER BY updated_at DESC LIMIT $2 OFFSET $3`
	rows, err := r.db.QueryContext(ctx, q, facilityID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := make([]models.InventoryRecord25, 0, limit)
	for rows.Next() {
		var rec models.InventoryRecord25
		var archived sql.NullTime
		if err := rows.Scan(
			&rec.ID, &rec.ExternalCode, &rec.DisplayName, &rec.Status, &rec.Priority, &rec.FacilityID,
			&rec.CreatedBy, &rec.UpdatedBy, &rec.Notes, &rec.MetadataJSON, &rec.Version, &rec.IsActive,
			&rec.CreatedAt, &rec.UpdatedAt, &archived,
		); err != nil {
			return nil, err
		}
		if archived.Valid {
			t := archived.Time
			rec.ArchivedAt = &t
		}
		out = append(out, rec)
	}
	return out, rows.Err()
}

// Update applies an optimistic-concurrency update.
func (r *InventoryRecord25Repository) Update(ctx context.Context, rec *models.InventoryRecord25) error {
	const q = `UPDATE inventory_25_records SET
		external_code=$1, display_name=$2, status=$3, priority=$4, notes=$5, metadata_json=$6,
		updated_by=$7, updated_at=$8, version=version+1, is_active=$9, archived_at=$10
		WHERE id=$11 AND version=$12`
	res, err := r.db.ExecContext(ctx, q,
		rec.ExternalCode, rec.DisplayName, rec.Status, rec.Priority, rec.Notes, rec.MetadataJSON,
		rec.UpdatedBy, time.Now().UTC(), rec.IsActive, rec.ArchivedAt, rec.ID, rec.Version,
	)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return models.ErrConflict
	}
	rec.Version++
	return nil
}

// Delete soft-deletes a InventoryRecord25.
func (r *InventoryRecord25Repository) Delete(ctx context.Context, id, actor string) error {
	now := time.Now().UTC()
	const q = `UPDATE inventory_25_records SET is_active=false, archived_at=$1, updated_by=$2, updated_at=$1, version=version+1 WHERE id=$3`
	res, err := r.db.ExecContext(ctx, q, now, actor, id)
	if err != nil {
		return err
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return models.ErrNotFound
	}
	return nil
}

// CountActive returns active row count for reporting.
func (r *InventoryRecord25Repository) CountActive(ctx context.Context, facilityID string) (int64, error) {
	const q = `SELECT COUNT(*) FROM inventory_25_records WHERE facility_id=$1 AND is_active=true`
	var n int64
	err := r.db.QueryRowContext(ctx, q, facilityID).Scan(&n)
	return n, err
}

// SearchByCode finds records matching an external code prefix.
func (r *InventoryRecord25Repository) SearchByCode(ctx context.Context, facilityID, prefix string, limit int) ([]models.InventoryRecord25, error) {
	const q = `SELECT id, external_code, display_name, status, priority, facility_id,
		created_by, updated_by, notes, metadata_json, version, is_active, created_at, updated_at, archived_at
		FROM inventory_25_records
		WHERE facility_id=$1 AND is_active=true AND external_code LIKE $2
		ORDER BY external_code ASC LIMIT $3`
	rows, err := r.db.QueryContext(ctx, q, facilityID, prefix+"%", limit)
	if err != nil {
		return nil, fmt.Errorf("search inventory: %w", err)
	}
	defer rows.Close()
	var out []models.InventoryRecord25
	for rows.Next() {
		var rec models.InventoryRecord25
		var archived sql.NullTime
		if err := rows.Scan(
			&rec.ID, &rec.ExternalCode, &rec.DisplayName, &rec.Status, &rec.Priority, &rec.FacilityID,
			&rec.CreatedBy, &rec.UpdatedBy, &rec.Notes, &rec.MetadataJSON, &rec.Version, &rec.IsActive,
			&rec.CreatedAt, &rec.UpdatedAt, &archived,
		); err != nil {
			return nil, err
		}
		if archived.Valid {
			t := archived.Time
			rec.ArchivedAt = &t
		}
		out = append(out, rec)
	}
	return out, rows.Err()
}
