package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord23Service encapsulates business rules for InventoryRecord23.
type InventoryRecord23Service struct {
	repo *repository.InventoryRecord23Repository
}

// NewInventoryRecord23Service wires the service.
func NewInventoryRecord23Service(repo *repository.InventoryRecord23Repository) *InventoryRecord23Service {
	return &InventoryRecord23Service{repo: repo}
}

// Create validates and persists a new InventoryRecord23.
func (s *InventoryRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord23, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord23{
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

// Get returns a InventoryRecord23 by id.
func (s *InventoryRecord23Service) Get(ctx context.Context, id string) (*models.InventoryRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord23 pages.
func (s *InventoryRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord23.
func (s *InventoryRecord23Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord23.
func (s *InventoryRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord23 by external code prefix.
func (s *InventoryRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
