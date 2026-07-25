package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord09Service encapsulates business rules for AnalyticsRecord09.
type AnalyticsRecord09Service struct {
	repo *repository.AnalyticsRecord09Repository
}

// NewAnalyticsRecord09Service wires the service.
func NewAnalyticsRecord09Service(repo *repository.AnalyticsRecord09Repository) *AnalyticsRecord09Service {
	return &AnalyticsRecord09Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord09.
func (s *AnalyticsRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord09, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord09{
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

// Get returns a AnalyticsRecord09 by id.
func (s *AnalyticsRecord09Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord09 pages.
func (s *AnalyticsRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord09.
func (s *AnalyticsRecord09Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord09.
func (s *AnalyticsRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord09 by external code prefix.
func (s *AnalyticsRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
