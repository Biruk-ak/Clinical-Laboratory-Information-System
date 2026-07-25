package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord14Service encapsulates business rules for BillingRecord14.
type BillingRecord14Service struct {
	repo *repository.BillingRecord14Repository
}

// NewBillingRecord14Service wires the service.
func NewBillingRecord14Service(repo *repository.BillingRecord14Repository) *BillingRecord14Service {
	return &BillingRecord14Service{repo: repo}
}

// Create validates and persists a new BillingRecord14.
func (s *BillingRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord14, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord14{
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

// Get returns a BillingRecord14 by id.
func (s *BillingRecord14Service) Get(ctx context.Context, id string) (*models.BillingRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord14 pages.
func (s *BillingRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord14.
func (s *BillingRecord14Service) Update(ctx context.Context, actor string, rec *models.BillingRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord14.
func (s *BillingRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord14 by external code prefix.
func (s *BillingRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
