package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord15Service encapsulates business rules for ReportRecord15.
type ReportRecord15Service struct {
	repo *repository.ReportRecord15Repository
}

// NewReportRecord15Service wires the service.
func NewReportRecord15Service(repo *repository.ReportRecord15Repository) *ReportRecord15Service {
	return &ReportRecord15Service{repo: repo}
}

// Create validates and persists a new ReportRecord15.
func (s *ReportRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord15, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord15{
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

// Get returns a ReportRecord15 by id.
func (s *ReportRecord15Service) Get(ctx context.Context, id string) (*models.ReportRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord15 pages.
func (s *ReportRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord15.
func (s *ReportRecord15Service) Update(ctx context.Context, actor string, rec *models.ReportRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord15.
func (s *ReportRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord15 by external code prefix.
func (s *ReportRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
