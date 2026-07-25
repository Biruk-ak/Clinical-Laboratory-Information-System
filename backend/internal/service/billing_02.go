package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord02Service encapsulates business rules for BillingRecord02.
type BillingRecord02Service struct {
	repo *repository.BillingRecord02Repository
}

// NewBillingRecord02Service wires the service.
func NewBillingRecord02Service(repo *repository.BillingRecord02Repository) *BillingRecord02Service {
	return &BillingRecord02Service{repo: repo}
}

// Create validates and persists a new BillingRecord02.
func (s *BillingRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord02, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord02{
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

// Get returns a BillingRecord02 by id.
func (s *BillingRecord02Service) Get(ctx context.Context, id string) (*models.BillingRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord02 pages.
func (s *BillingRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord02.
func (s *BillingRecord02Service) Update(ctx context.Context, actor string, rec *models.BillingRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord02.
func (s *BillingRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord02 by external code prefix.
func (s *BillingRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
