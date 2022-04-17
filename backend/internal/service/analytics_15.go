package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AnalyticsRecord15Service encapsulates business rules for AnalyticsRecord15.
type AnalyticsRecord15Service struct {
	repo *repository.AnalyticsRecord15Repository
}

// NewAnalyticsRecord15Service wires the service.
func NewAnalyticsRecord15Service(repo *repository.AnalyticsRecord15Repository) *AnalyticsRecord15Service {
	return &AnalyticsRecord15Service{repo: repo}
}

// Create validates and persists a new AnalyticsRecord15.
func (s *AnalyticsRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AnalyticsRecord15, error) {
	now := time.Now().UTC()
	rec := &models.AnalyticsRecord15{
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

// Get returns a AnalyticsRecord15 by id.
func (s *AnalyticsRecord15Service) Get(ctx context.Context, id string) (*models.AnalyticsRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AnalyticsRecord15 pages.
func (s *AnalyticsRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AnalyticsRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AnalyticsRecord15.
func (s *AnalyticsRecord15Service) Update(ctx context.Context, actor string, rec *models.AnalyticsRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AnalyticsRecord15.
func (s *AnalyticsRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AnalyticsRecord15 by external code prefix.
func (s *AnalyticsRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AnalyticsRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AnalyticsRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
