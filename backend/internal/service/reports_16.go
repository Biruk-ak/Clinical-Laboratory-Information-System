package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord16Service encapsulates business rules for ReportRecord16.
type ReportRecord16Service struct {
	repo *repository.ReportRecord16Repository
}

// NewReportRecord16Service wires the service.
func NewReportRecord16Service(repo *repository.ReportRecord16Repository) *ReportRecord16Service {
	return &ReportRecord16Service{repo: repo}
}

// Create validates and persists a new ReportRecord16.
func (s *ReportRecord16Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord16, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord16{
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

// Get returns a ReportRecord16 by id.
func (s *ReportRecord16Service) Get(ctx context.Context, id string) (*models.ReportRecord16, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord16 pages.
func (s *ReportRecord16Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord16, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord16.
func (s *ReportRecord16Service) Update(ctx context.Context, actor string, rec *models.ReportRecord16) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord16.
func (s *ReportRecord16Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord16 by external code prefix.
func (s *ReportRecord16Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord16, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord16Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
