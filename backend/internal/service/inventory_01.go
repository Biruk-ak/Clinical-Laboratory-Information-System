package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord01Service encapsulates business rules for InventoryRecord01.
type InventoryRecord01Service struct {
	repo *repository.InventoryRecord01Repository
}

// NewInventoryRecord01Service wires the service.
func NewInventoryRecord01Service(repo *repository.InventoryRecord01Repository) *InventoryRecord01Service {
	return &InventoryRecord01Service{repo: repo}
}

// Create validates and persists a new InventoryRecord01.
func (s *InventoryRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord01, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord01{
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

// Get returns a InventoryRecord01 by id.
func (s *InventoryRecord01Service) Get(ctx context.Context, id string) (*models.InventoryRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord01 pages.
func (s *InventoryRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord01.
func (s *InventoryRecord01Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord01.
func (s *InventoryRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord01 by external code prefix.
func (s *InventoryRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
