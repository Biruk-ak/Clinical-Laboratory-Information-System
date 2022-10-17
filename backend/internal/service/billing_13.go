package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord13Service encapsulates business rules for BillingRecord13.
type BillingRecord13Service struct {
	repo *repository.BillingRecord13Repository
}

// NewBillingRecord13Service wires the service.
func NewBillingRecord13Service(repo *repository.BillingRecord13Repository) *BillingRecord13Service {
	return &BillingRecord13Service{repo: repo}
}

// Create validates and persists a new BillingRecord13.
func (s *BillingRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord13, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord13{
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

// Get returns a BillingRecord13 by id.
func (s *BillingRecord13Service) Get(ctx context.Context, id string) (*models.BillingRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord13 pages.
func (s *BillingRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord13.
func (s *BillingRecord13Service) Update(ctx context.Context, actor string, rec *models.BillingRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord13.
func (s *BillingRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord13 by external code prefix.
func (s *BillingRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
