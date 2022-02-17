package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord23Service encapsulates business rules for ReportRecord23.
type ReportRecord23Service struct {
	repo *repository.ReportRecord23Repository
}

// NewReportRecord23Service wires the service.
func NewReportRecord23Service(repo *repository.ReportRecord23Repository) *ReportRecord23Service {
	return &ReportRecord23Service{repo: repo}
}

// Create validates and persists a new ReportRecord23.
func (s *ReportRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord23, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord23{
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

// Get returns a ReportRecord23 by id.
func (s *ReportRecord23Service) Get(ctx context.Context, id string) (*models.ReportRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord23 pages.
func (s *ReportRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord23.
func (s *ReportRecord23Service) Update(ctx context.Context, actor string, rec *models.ReportRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord23.
func (s *ReportRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord23 by external code prefix.
func (s *ReportRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
