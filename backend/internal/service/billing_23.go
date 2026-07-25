package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord23Service encapsulates business rules for BillingRecord23.
type BillingRecord23Service struct {
	repo *repository.BillingRecord23Repository
}

// NewBillingRecord23Service wires the service.
func NewBillingRecord23Service(repo *repository.BillingRecord23Repository) *BillingRecord23Service {
	return &BillingRecord23Service{repo: repo}
}

// Create validates and persists a new BillingRecord23.
func (s *BillingRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord23, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord23{
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

// Get returns a BillingRecord23 by id.
func (s *BillingRecord23Service) Get(ctx context.Context, id string) (*models.BillingRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord23 pages.
func (s *BillingRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord23.
func (s *BillingRecord23Service) Update(ctx context.Context, actor string, rec *models.BillingRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord23.
func (s *BillingRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord23 by external code prefix.
func (s *BillingRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
