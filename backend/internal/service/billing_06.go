package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord06Service encapsulates business rules for BillingRecord06.
type BillingRecord06Service struct {
	repo *repository.BillingRecord06Repository
}

// NewBillingRecord06Service wires the service.
func NewBillingRecord06Service(repo *repository.BillingRecord06Repository) *BillingRecord06Service {
	return &BillingRecord06Service{repo: repo}
}

// Create validates and persists a new BillingRecord06.
func (s *BillingRecord06Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord06, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord06{
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

// Get returns a BillingRecord06 by id.
func (s *BillingRecord06Service) Get(ctx context.Context, id string) (*models.BillingRecord06, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord06 pages.
func (s *BillingRecord06Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord06, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord06.
func (s *BillingRecord06Service) Update(ctx context.Context, actor string, rec *models.BillingRecord06) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord06.
func (s *BillingRecord06Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord06 by external code prefix.
func (s *BillingRecord06Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord06, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord06Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
