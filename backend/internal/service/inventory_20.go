package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord20Service encapsulates business rules for InventoryRecord20.
type InventoryRecord20Service struct {
	repo *repository.InventoryRecord20Repository
}

// NewInventoryRecord20Service wires the service.
func NewInventoryRecord20Service(repo *repository.InventoryRecord20Repository) *InventoryRecord20Service {
	return &InventoryRecord20Service{repo: repo}
}

// Create validates and persists a new InventoryRecord20.
func (s *InventoryRecord20Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord20, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord20{
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

// Get returns a InventoryRecord20 by id.
func (s *InventoryRecord20Service) Get(ctx context.Context, id string) (*models.InventoryRecord20, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord20 pages.
func (s *InventoryRecord20Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord20, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord20.
func (s *InventoryRecord20Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord20) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord20.
func (s *InventoryRecord20Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord20 by external code prefix.
func (s *InventoryRecord20Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord20, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord20Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
