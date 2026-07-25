package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord27Service encapsulates business rules for ReportRecord27.
type ReportRecord27Service struct {
	repo *repository.ReportRecord27Repository
}

// NewReportRecord27Service wires the service.
func NewReportRecord27Service(repo *repository.ReportRecord27Repository) *ReportRecord27Service {
	return &ReportRecord27Service{repo: repo}
}

// Create validates and persists a new ReportRecord27.
func (s *ReportRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord27, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord27{
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

// Get returns a ReportRecord27 by id.
func (s *ReportRecord27Service) Get(ctx context.Context, id string) (*models.ReportRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord27 pages.
func (s *ReportRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord27.
func (s *ReportRecord27Service) Update(ctx context.Context, actor string, rec *models.ReportRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord27.
func (s *ReportRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord27 by external code prefix.
func (s *ReportRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
