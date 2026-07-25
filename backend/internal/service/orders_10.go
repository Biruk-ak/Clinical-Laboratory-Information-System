package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord10Service encapsulates business rules for OrderRecord10.
type OrderRecord10Service struct {
	repo *repository.OrderRecord10Repository
}

// NewOrderRecord10Service wires the service.
func NewOrderRecord10Service(repo *repository.OrderRecord10Repository) *OrderRecord10Service {
	return &OrderRecord10Service{repo: repo}
}

// Create validates and persists a new OrderRecord10.
func (s *OrderRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord10, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord10{
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

// Get returns a OrderRecord10 by id.
func (s *OrderRecord10Service) Get(ctx context.Context, id string) (*models.OrderRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord10 pages.
func (s *OrderRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord10.
func (s *OrderRecord10Service) Update(ctx context.Context, actor string, rec *models.OrderRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord10.
func (s *OrderRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord10 by external code prefix.
func (s *OrderRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
