package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord28Service encapsulates business rules for BillingRecord28.
type BillingRecord28Service struct {
	repo *repository.BillingRecord28Repository
}

// NewBillingRecord28Service wires the service.
func NewBillingRecord28Service(repo *repository.BillingRecord28Repository) *BillingRecord28Service {
	return &BillingRecord28Service{repo: repo}
}

// Create validates and persists a new BillingRecord28.
func (s *BillingRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord28, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord28{
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

// Get returns a BillingRecord28 by id.
func (s *BillingRecord28Service) Get(ctx context.Context, id string) (*models.BillingRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord28 pages.
func (s *BillingRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord28.
func (s *BillingRecord28Service) Update(ctx context.Context, actor string, rec *models.BillingRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord28.
func (s *BillingRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord28 by external code prefix.
func (s *BillingRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
