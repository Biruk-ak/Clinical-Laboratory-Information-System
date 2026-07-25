package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord24Service encapsulates business rules for ReportRecord24.
type ReportRecord24Service struct {
	repo *repository.ReportRecord24Repository
}

// NewReportRecord24Service wires the service.
func NewReportRecord24Service(repo *repository.ReportRecord24Repository) *ReportRecord24Service {
	return &ReportRecord24Service{repo: repo}
}

// Create validates and persists a new ReportRecord24.
func (s *ReportRecord24Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord24, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord24{
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

// Get returns a ReportRecord24 by id.
func (s *ReportRecord24Service) Get(ctx context.Context, id string) (*models.ReportRecord24, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord24 pages.
func (s *ReportRecord24Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord24, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord24.
func (s *ReportRecord24Service) Update(ctx context.Context, actor string, rec *models.ReportRecord24) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord24.
func (s *ReportRecord24Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord24 by external code prefix.
func (s *ReportRecord24Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord24, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord24Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
