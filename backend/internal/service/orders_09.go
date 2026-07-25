package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord09Service encapsulates business rules for OrderRecord09.
type OrderRecord09Service struct {
	repo *repository.OrderRecord09Repository
}

// NewOrderRecord09Service wires the service.
func NewOrderRecord09Service(repo *repository.OrderRecord09Repository) *OrderRecord09Service {
	return &OrderRecord09Service{repo: repo}
}

// Create validates and persists a new OrderRecord09.
func (s *OrderRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord09, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord09{
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

// Get returns a OrderRecord09 by id.
func (s *OrderRecord09Service) Get(ctx context.Context, id string) (*models.OrderRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord09 pages.
func (s *OrderRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord09.
func (s *OrderRecord09Service) Update(ctx context.Context, actor string, rec *models.OrderRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord09.
func (s *OrderRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord09 by external code prefix.
func (s *OrderRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
