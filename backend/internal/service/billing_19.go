package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord19Service encapsulates business rules for BillingRecord19.
type BillingRecord19Service struct {
	repo *repository.BillingRecord19Repository
}

// NewBillingRecord19Service wires the service.
func NewBillingRecord19Service(repo *repository.BillingRecord19Repository) *BillingRecord19Service {
	return &BillingRecord19Service{repo: repo}
}

// Create validates and persists a new BillingRecord19.
func (s *BillingRecord19Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord19, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord19{
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

// Get returns a BillingRecord19 by id.
func (s *BillingRecord19Service) Get(ctx context.Context, id string) (*models.BillingRecord19, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord19 pages.
func (s *BillingRecord19Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord19, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord19.
func (s *BillingRecord19Service) Update(ctx context.Context, actor string, rec *models.BillingRecord19) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord19.
func (s *BillingRecord19Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord19 by external code prefix.
func (s *BillingRecord19Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord19, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord19Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
