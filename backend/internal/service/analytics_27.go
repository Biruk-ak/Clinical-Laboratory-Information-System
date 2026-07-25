package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord27Service encapsulates business rules for AnalyticsRecord27.
type AnalyticsRecord27Service struct {
	repo *repository.AnalyticsRecord27Repository
}

// NewAnalyticsRecord27Service wires the service.
func NewAnalyticsRecord27Service(repo *repository.AnalyticsRecord27Repository) *AnalyticsRecord27Service {
	return &AnalyticsRecord27Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord27.
func (s *AnalyticsRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord27, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord27{
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

// Get returns a AnalyticsRecord27 by id.
func (s *AnalyticsRecord27Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord27 pages.
func (s *AnalyticsRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord27.
func (s *AnalyticsRecord27Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord27.
func (s *AnalyticsRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord27 by external code prefix.
func (s *AnalyticsRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
