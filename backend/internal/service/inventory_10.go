package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord10Service encapsulates business rules for InventoryRecord10.
type InventoryRecord10Service struct {
	repo *repository.InventoryRecord10Repository
}

// NewInventoryRecord10Service wires the service.
func NewInventoryRecord10Service(repo *repository.InventoryRecord10Repository) *InventoryRecord10Service {
	return &InventoryRecord10Service{repo: repo}
}

// Create validates and persists a new InventoryRecord10.
func (s *InventoryRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord10, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord10{
		ID:           uuid.NewString(),
		ExternalCode: code,
		DisplayName:  display,
		Status:       status,
		Priority:     priority,
		FacilityID:   facilityID,
		CreatedBy:    actor,
		UpdatedBy:    actor,
		Notes:        notes,
		MetadataJSON: "{}",
		Version:      1,
		IsActive:     true,
		CreatedAt:    now,
		UpdatedAt:    now,
	}
	if err := rec.Validate(); err != nil {
		return nil, err
	}
	if err := s.repo.Create(ctx, rec); err != nil {
		return nil, err
	}
	return rec, nil
}

// Get returns a InventoryRecord10 by id.
func (s *InventoryRecord10Service) Get(ctx context.Context, id string) (*models.InventoryRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord10 pages.
func (s *InventoryRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord10.
func (s *InventoryRecord10Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord10.
func (s *InventoryRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord10 by external code prefix.
func (s *InventoryRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
