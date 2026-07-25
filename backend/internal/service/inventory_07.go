package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord07Service encapsulates business rules for InventoryRecord07.
type InventoryRecord07Service struct {
	repo *repository.InventoryRecord07Repository
}

// NewInventoryRecord07Service wires the service.
func NewInventoryRecord07Service(repo *repository.InventoryRecord07Repository) *InventoryRecord07Service {
	return &InventoryRecord07Service{repo: repo}
}

// Create validates and persists a new InventoryRecord07.
func (s *InventoryRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord07, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord07{
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

// Get returns a InventoryRecord07 by id.
func (s *InventoryRecord07Service) Get(ctx context.Context, id string) (*models.InventoryRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord07 pages.
func (s *InventoryRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord07.
func (s *InventoryRecord07Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord07.
func (s *InventoryRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord07 by external code prefix.
func (s *InventoryRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
