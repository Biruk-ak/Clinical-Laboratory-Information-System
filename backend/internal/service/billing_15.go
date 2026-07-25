package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord15Service encapsulates business rules for BillingRecord15.
type BillingRecord15Service struct {
	repo *repository.BillingRecord15Repository
}

// NewBillingRecord15Service wires the service.
func NewBillingRecord15Service(repo *repository.BillingRecord15Repository) *BillingRecord15Service {
	return &BillingRecord15Service{repo: repo}
}

// Create validates and persists a new BillingRecord15.
func (s *BillingRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord15, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord15{
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

// Get returns a BillingRecord15 by id.
func (s *BillingRecord15Service) Get(ctx context.Context, id string) (*models.BillingRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord15 pages.
func (s *BillingRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord15.
func (s *BillingRecord15Service) Update(ctx context.Context, actor string, rec *models.BillingRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord15.
func (s *BillingRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord15 by external code prefix.
func (s *BillingRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
