package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord28Service encapsulates business rules for ReportRecord28.
type ReportRecord28Service struct {
	repo *repository.ReportRecord28Repository
}

// NewReportRecord28Service wires the service.
func NewReportRecord28Service(repo *repository.ReportRecord28Repository) *ReportRecord28Service {
	return &ReportRecord28Service{repo: repo}
}

// Create validates and persists a new ReportRecord28.
func (s *ReportRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord28, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord28{
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

// Get returns a ReportRecord28 by id.
func (s *ReportRecord28Service) Get(ctx context.Context, id string) (*models.ReportRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord28 pages.
func (s *ReportRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord28.
func (s *ReportRecord28Service) Update(ctx context.Context, actor string, rec *models.ReportRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord28.
func (s *ReportRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord28 by external code prefix.
func (s *ReportRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
