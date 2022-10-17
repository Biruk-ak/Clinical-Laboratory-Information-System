package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord05Service encapsulates business rules for BillingRecord05.
type BillingRecord05Service struct {
	repo *repository.BillingRecord05Repository
}

// NewBillingRecord05Service wires the service.
func NewBillingRecord05Service(repo *repository.BillingRecord05Repository) *BillingRecord05Service {
	return &BillingRecord05Service{repo: repo}
}

// Create validates and persists a new BillingRecord05.
func (s *BillingRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord05, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord05{
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

// Get returns a BillingRecord05 by id.
func (s *BillingRecord05Service) Get(ctx context.Context, id string) (*models.BillingRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord05 pages.
func (s *BillingRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord05.
func (s *BillingRecord05Service) Update(ctx context.Context, actor string, rec *models.BillingRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord05.
func (s *BillingRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord05 by external code prefix.
func (s *BillingRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
