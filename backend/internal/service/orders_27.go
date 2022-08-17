package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord27Service encapsulates business rules for OrderRecord27.
type OrderRecord27Service struct {
	repo *repository.OrderRecord27Repository
}

// NewOrderRecord27Service wires the service.
func NewOrderRecord27Service(repo *repository.OrderRecord27Repository) *OrderRecord27Service {
	return &OrderRecord27Service{repo: repo}
}

// Create validates and persists a new OrderRecord27.
func (s *OrderRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord27, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord27{
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

// Get returns a OrderRecord27 by id.
func (s *OrderRecord27Service) Get(ctx context.Context, id string) (*models.OrderRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord27 pages.
func (s *OrderRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord27.
func (s *OrderRecord27Service) Update(ctx context.Context, actor string, rec *models.OrderRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord27.
func (s *OrderRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord27 by external code prefix.
func (s *OrderRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
