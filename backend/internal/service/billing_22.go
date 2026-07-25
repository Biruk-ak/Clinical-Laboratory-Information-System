package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// BillingRecord22Service encapsulates business rules for BillingRecord22.
type BillingRecord22Service struct {
	repo *repository.BillingRecord22Repository
}

// NewBillingRecord22Service wires the service.
func NewBillingRecord22Service(repo *repository.BillingRecord22Repository) *BillingRecord22Service {
	return &BillingRecord22Service{repo: repo}
}

// Create validates and persists a new BillingRecord22.
func (s *BillingRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.BillingRecord22, error) {
	now := time.Now().UTC()
	rec := &models.BillingRecord22{
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

// Get returns a BillingRecord22 by id.
func (s *BillingRecord22Service) Get(ctx context.Context, id string) (*models.BillingRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped BillingRecord22 pages.
func (s *BillingRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.BillingRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing BillingRecord22.
func (s *BillingRecord22Service) Update(ctx context.Context, actor string, rec *models.BillingRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a BillingRecord22.
func (s *BillingRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds BillingRecord22 by external code prefix.
func (s *BillingRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.BillingRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *BillingRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
