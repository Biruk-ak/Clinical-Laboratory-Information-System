package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord21Service encapsulates business rules for ReportRecord21.
type ReportRecord21Service struct {
	repo *repository.ReportRecord21Repository
}

// NewReportRecord21Service wires the service.
func NewReportRecord21Service(repo *repository.ReportRecord21Repository) *ReportRecord21Service {
	return &ReportRecord21Service{repo: repo}
}

// Create validates and persists a new ReportRecord21.
func (s *ReportRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord21, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord21{
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

// Get returns a ReportRecord21 by id.
func (s *ReportRecord21Service) Get(ctx context.Context, id string) (*models.ReportRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord21 pages.
func (s *ReportRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord21.
func (s *ReportRecord21Service) Update(ctx context.Context, actor string, rec *models.ReportRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord21.
func (s *ReportRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord21 by external code prefix.
func (s *ReportRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
