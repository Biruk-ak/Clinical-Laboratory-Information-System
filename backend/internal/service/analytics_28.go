package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord28Service encapsulates business rules for AnalyticsRecord28.
type AnalyticsRecord28Service struct {
	repo *repository.AnalyticsRecord28Repository
}

// NewAnalyticsRecord28Service wires the service.
func NewAnalyticsRecord28Service(repo *repository.AnalyticsRecord28Repository) *AnalyticsRecord28Service {
	return &AnalyticsRecord28Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord28.
func (s *AnalyticsRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord28, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord28{
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

// Get returns a AnalyticsRecord28 by id.
func (s *AnalyticsRecord28Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord28 pages.
func (s *AnalyticsRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord28.
func (s *AnalyticsRecord28Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord28.
func (s *AnalyticsRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord28 by external code prefix.
func (s *AnalyticsRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
