package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord21Service encapsulates business rules for BillingRecord21.
type BillingRecord21Service struct {
	repo *repository.BillingRecord21Repository
}

// NewBillingRecord21Service wires the service.
func NewBillingRecord21Service(repo *repository.BillingRecord21Repository) *BillingRecord21Service {
	return &BillingRecord21Service{repo: repo}
}

// Create validates and persists a new BillingRecord21.
func (s *BillingRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord21, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord21{
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

// Get returns a BillingRecord21 by id.
func (s *BillingRecord21Service) Get(ctx context.Context, id string) (*models.BillingRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord21 pages.
func (s *BillingRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord21.
func (s *BillingRecord21Service) Update(ctx context.Context, actor string, rec *models.BillingRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord21.
func (s *BillingRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord21 by external code prefix.
func (s *BillingRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
