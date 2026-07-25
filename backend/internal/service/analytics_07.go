package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord07Service encapsulates business rules for AnalyticsRecord07.
type AnalyticsRecord07Service struct {
	repo *repository.AnalyticsRecord07Repository
}

// NewAnalyticsRecord07Service wires the service.
func NewAnalyticsRecord07Service(repo *repository.AnalyticsRecord07Repository) *AnalyticsRecord07Service {
	return &AnalyticsRecord07Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord07.
func (s *AnalyticsRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord07, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord07{
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

// Get returns a AnalyticsRecord07 by id.
func (s *AnalyticsRecord07Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord07 pages.
func (s *AnalyticsRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord07.
func (s *AnalyticsRecord07Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord07.
func (s *AnalyticsRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord07 by external code prefix.
func (s *AnalyticsRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
