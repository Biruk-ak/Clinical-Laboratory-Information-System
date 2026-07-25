package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord17Service encapsulates business rules for AnalyticsRecord17.
type AnalyticsRecord17Service struct {
	repo *repository.AnalyticsRecord17Repository
}

// NewAnalyticsRecord17Service wires the service.
func NewAnalyticsRecord17Service(repo *repository.AnalyticsRecord17Repository) *AnalyticsRecord17Service {
	return &AnalyticsRecord17Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord17.
func (s *AnalyticsRecord17Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord17, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord17{
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

// Get returns a AnalyticsRecord17 by id.
func (s *AnalyticsRecord17Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord17, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord17 pages.
func (s *AnalyticsRecord17Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord17, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord17.
func (s *AnalyticsRecord17Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord17) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord17.
func (s *AnalyticsRecord17Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord17 by external code prefix.
func (s *AnalyticsRecord17Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord17, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord17Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
