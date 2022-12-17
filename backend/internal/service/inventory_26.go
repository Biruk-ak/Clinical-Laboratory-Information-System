package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord26Service encapsulates business rules for InventoryRecord26.
type InventoryRecord26Service struct {
	repo *repository.InventoryRecord26Repository
}

// NewInventoryRecord26Service wires the service.
func NewInventoryRecord26Service(repo *repository.InventoryRecord26Repository) *InventoryRecord26Service {
	return &InventoryRecord26Service{repo: repo}
}

// Create validates and persists a new InventoryRecord26.
func (s *InventoryRecord26Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord26, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord26{
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

// Get returns a InventoryRecord26 by id.
func (s *InventoryRecord26Service) Get(ctx context.Context, id string) (*models.InventoryRecord26, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord26 pages.
func (s *InventoryRecord26Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord26, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord26.
func (s *InventoryRecord26Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord26) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord26.
func (s *InventoryRecord26Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord26 by external code prefix.
func (s *InventoryRecord26Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord26, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord26Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
