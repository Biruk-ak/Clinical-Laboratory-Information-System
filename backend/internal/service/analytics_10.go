package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord10Service encapsulates business rules for AnalyticsRecord10.
type AnalyticsRecord10Service struct {
	repo *repository.AnalyticsRecord10Repository
}

// NewAnalyticsRecord10Service wires the service.
func NewAnalyticsRecord10Service(repo *repository.AnalyticsRecord10Repository) *AnalyticsRecord10Service {
	return &AnalyticsRecord10Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord10.
func (s *AnalyticsRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord10, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord10{
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

// Get returns a AnalyticsRecord10 by id.
func (s *AnalyticsRecord10Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord10 pages.
func (s *AnalyticsRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord10.
func (s *AnalyticsRecord10Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord10.
func (s *AnalyticsRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord10 by external code prefix.
func (s *AnalyticsRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
