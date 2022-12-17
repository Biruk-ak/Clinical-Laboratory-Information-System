package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// InventoryRecord18Service encapsulates business rules for InventoryRecord18.
type InventoryRecord18Service struct {
	repo *repository.InventoryRecord18Repository
}

// NewInventoryRecord18Service wires the service.
func NewInventoryRecord18Service(repo *repository.InventoryRecord18Repository) *InventoryRecord18Service {
	return &InventoryRecord18Service{repo: repo}
}

// Create validates and persists a new InventoryRecord18.
func (s *InventoryRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.InventoryRecord18, error) {
	now := time.Now().UTC()
	rec := &models.InventoryRecord18{
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

// Get returns a InventoryRecord18 by id.
func (s *InventoryRecord18Service) Get(ctx context.Context, id string) (*models.InventoryRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped InventoryRecord18 pages.
func (s *InventoryRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.InventoryRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing InventoryRecord18.
func (s *InventoryRecord18Service) Update(ctx context.Context, actor string, rec *models.InventoryRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a InventoryRecord18.
func (s *InventoryRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds InventoryRecord18 by external code prefix.
func (s *InventoryRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.InventoryRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *InventoryRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
