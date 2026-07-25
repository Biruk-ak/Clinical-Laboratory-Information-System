package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord09Service encapsulates business rules for ReportRecord09.
type ReportRecord09Service struct {
	repo *repository.ReportRecord09Repository
}

// NewReportRecord09Service wires the service.
func NewReportRecord09Service(repo *repository.ReportRecord09Repository) *ReportRecord09Service {
	return &ReportRecord09Service{repo: repo}
}

// Create validates and persists a new ReportRecord09.
func (s *ReportRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord09, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord09{
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

// Get returns a ReportRecord09 by id.
func (s *ReportRecord09Service) Get(ctx context.Context, id string) (*models.ReportRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord09 pages.
func (s *ReportRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord09.
func (s *ReportRecord09Service) Update(ctx context.Context, actor string, rec *models.ReportRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord09.
func (s *ReportRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord09 by external code prefix.
func (s *ReportRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
