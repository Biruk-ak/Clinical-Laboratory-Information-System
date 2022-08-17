package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord01Service encapsulates business rules for OrderRecord01.
type OrderRecord01Service struct {
	repo *repository.OrderRecord01Repository
}

// NewOrderRecord01Service wires the service.
func NewOrderRecord01Service(repo *repository.OrderRecord01Repository) *OrderRecord01Service {
	return &OrderRecord01Service{repo: repo}
}

// Create validates and persists a new OrderRecord01.
func (s *OrderRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord01, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord01{
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

// Get returns a OrderRecord01 by id.
func (s *OrderRecord01Service) Get(ctx context.Context, id string) (*models.OrderRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord01 pages.
func (s *OrderRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord01.
func (s *OrderRecord01Service) Update(ctx context.Context, actor string, rec *models.OrderRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord01.
func (s *OrderRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord01 by external code prefix.
func (s *OrderRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
