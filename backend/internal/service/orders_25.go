package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord25Service encapsulates business rules for OrderRecord25.
type OrderRecord25Service struct {
	repo *repository.OrderRecord25Repository
}

// NewOrderRecord25Service wires the service.
func NewOrderRecord25Service(repo *repository.OrderRecord25Repository) *OrderRecord25Service {
	return &OrderRecord25Service{repo: repo}
}

// Create validates and persists a new OrderRecord25.
func (s *OrderRecord25Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord25, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord25{
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

// Get returns a OrderRecord25 by id.
func (s *OrderRecord25Service) Get(ctx context.Context, id string) (*models.OrderRecord25, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord25 pages.
func (s *OrderRecord25Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord25, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord25.
func (s *OrderRecord25Service) Update(ctx context.Context, actor string, rec *models.OrderRecord25) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord25.
func (s *OrderRecord25Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord25 by external code prefix.
func (s *OrderRecord25Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord25, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord25Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
