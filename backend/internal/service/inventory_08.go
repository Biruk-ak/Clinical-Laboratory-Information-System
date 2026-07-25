package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord08Service encapsulates business rules for InventoryRecord08.
type InventoryRecord08Service struct {
	repo *repository.InventoryRecord08Repository
}

// NewInventoryRecord08Service wires the service.
func NewInventoryRecord08Service(repo *repository.InventoryRecord08Repository) *InventoryRecord08Service {
	return &InventoryRecord08Service{repo: repo}
}

// Create validates and persists a new InventoryRecord08.
func (s *InventoryRecord08Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord08, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord08{
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

// Get returns a InventoryRecord08 by id.
func (s *InventoryRecord08Service) Get(ctx context.Context, id string) (*models.InventoryRecord08, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord08 pages.
func (s *InventoryRecord08Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord08, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord08.
func (s *InventoryRecord08Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord08) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord08.
func (s *InventoryRecord08Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord08 by external code prefix.
func (s *InventoryRecord08Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord08, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord08Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
