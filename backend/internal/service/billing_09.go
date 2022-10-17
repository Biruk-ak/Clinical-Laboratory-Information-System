package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord09Service encapsulates business rules for BillingRecord09.
type BillingRecord09Service struct {
	repo *repository.BillingRecord09Repository
}

// NewBillingRecord09Service wires the service.
func NewBillingRecord09Service(repo *repository.BillingRecord09Repository) *BillingRecord09Service {
	return &BillingRecord09Service{repo: repo}
}

// Create validates and persists a new BillingRecord09.
func (s *BillingRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord09, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord09{
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

// Get returns a BillingRecord09 by id.
func (s *BillingRecord09Service) Get(ctx context.Context, id string) (*models.BillingRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord09 pages.
func (s *BillingRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord09.
func (s *BillingRecord09Service) Update(ctx context.Context, actor string, rec *models.BillingRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord09.
func (s *BillingRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord09 by external code prefix.
func (s *BillingRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
