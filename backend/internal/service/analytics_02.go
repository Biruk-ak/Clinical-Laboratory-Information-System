package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord02Service encapsulates business rules for AnalyticsRecord02.
type AnalyticsRecord02Service struct {
	repo *repository.AnalyticsRecord02Repository
}

// NewAnalyticsRecord02Service wires the service.
func NewAnalyticsRecord02Service(repo *repository.AnalyticsRecord02Repository) *AnalyticsRecord02Service {
	return &AnalyticsRecord02Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord02.
func (s *AnalyticsRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord02, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord02{
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

// Get returns a AnalyticsRecord02 by id.
func (s *AnalyticsRecord02Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord02 pages.
func (s *AnalyticsRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord02.
func (s *AnalyticsRecord02Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord02.
func (s *AnalyticsRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord02 by external code prefix.
func (s *AnalyticsRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
