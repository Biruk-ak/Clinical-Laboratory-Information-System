package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord21Service encapsulates business rules for OrderRecord21.
type OrderRecord21Service struct {
	repo *repository.OrderRecord21Repository
}

// NewOrderRecord21Service wires the service.
func NewOrderRecord21Service(repo *repository.OrderRecord21Repository) *OrderRecord21Service {
	return &OrderRecord21Service{repo: repo}
}

// Create validates and persists a new OrderRecord21.
func (s *OrderRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord21, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord21{
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

// Get returns a OrderRecord21 by id.
func (s *OrderRecord21Service) Get(ctx context.Context, id string) (*models.OrderRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord21 pages.
func (s *OrderRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord21.
func (s *OrderRecord21Service) Update(ctx context.Context, actor string, rec *models.OrderRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord21.
func (s *OrderRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord21 by external code prefix.
func (s *OrderRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
