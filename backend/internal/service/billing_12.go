package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord12Service encapsulates business rules for BillingRecord12.
type BillingRecord12Service struct {
	repo *repository.BillingRecord12Repository
}

// NewBillingRecord12Service wires the service.
func NewBillingRecord12Service(repo *repository.BillingRecord12Repository) *BillingRecord12Service {
	return &BillingRecord12Service{repo: repo}
}

// Create validates and persists a new BillingRecord12.
func (s *BillingRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord12, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord12{
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

// Get returns a BillingRecord12 by id.
func (s *BillingRecord12Service) Get(ctx context.Context, id string) (*models.BillingRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord12 pages.
func (s *BillingRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord12.
func (s *BillingRecord12Service) Update(ctx context.Context, actor string, rec *models.BillingRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord12.
func (s *BillingRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord12 by external code prefix.
func (s *BillingRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
