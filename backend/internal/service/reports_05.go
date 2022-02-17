package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord05Service encapsulates business rules for ReportRecord05.
type ReportRecord05Service struct {
	repo *repository.ReportRecord05Repository
}

// NewReportRecord05Service wires the service.
func NewReportRecord05Service(repo *repository.ReportRecord05Repository) *ReportRecord05Service {
	return &ReportRecord05Service{repo: repo}
}

// Create validates and persists a new ReportRecord05.
func (s *ReportRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord05, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord05{
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

// Get returns a ReportRecord05 by id.
func (s *ReportRecord05Service) Get(ctx context.Context, id string) (*models.ReportRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord05 pages.
func (s *ReportRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord05.
func (s *ReportRecord05Service) Update(ctx context.Context, actor string, rec *models.ReportRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord05.
func (s *ReportRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord05 by external code prefix.
func (s *ReportRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
