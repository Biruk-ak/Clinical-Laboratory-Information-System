package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord01Service encapsulates business rules for AnalyticsRecord01.
type AnalyticsRecord01Service struct {
	repo *repository.AnalyticsRecord01Repository
}

// NewAnalyticsRecord01Service wires the service.
func NewAnalyticsRecord01Service(repo *repository.AnalyticsRecord01Repository) *AnalyticsRecord01Service {
	return &AnalyticsRecord01Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord01.
func (s *AnalyticsRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord01, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord01{
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

// Get returns a AnalyticsRecord01 by id.
func (s *AnalyticsRecord01Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord01 pages.
func (s *AnalyticsRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord01.
func (s *AnalyticsRecord01Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord01.
func (s *AnalyticsRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord01 by external code prefix.
func (s *AnalyticsRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
