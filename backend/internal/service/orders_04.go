package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// OrderRecord04Service encapsulates business rules for OrderRecord04.
type OrderRecord04Service struct {
	repo *repository.OrderRecord04Repository
}

// NewOrderRecord04Service wires the service.
func NewOrderRecord04Service(repo *repository.OrderRecord04Repository) *OrderRecord04Service {
	return &OrderRecord04Service{repo: repo}
}

// Create validates and persists a new OrderRecord04.
func (s *OrderRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.OrderRecord04, error) {
	now := time.Now().UTC()
	rec := &models.OrderRecord04{
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

// Get returns a OrderRecord04 by id.
func (s *OrderRecord04Service) Get(ctx context.Context, id string) (*models.OrderRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped OrderRecord04 pages.
func (s *OrderRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.OrderRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing OrderRecord04.
func (s *OrderRecord04Service) Update(ctx context.Context, actor string, rec *models.OrderRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a OrderRecord04.
func (s *OrderRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds OrderRecord04 by external code prefix.
func (s *OrderRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.OrderRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *OrderRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
