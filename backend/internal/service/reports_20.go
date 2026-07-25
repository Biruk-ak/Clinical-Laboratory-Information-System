package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord20Service encapsulates business rules for ReportRecord20.
type ReportRecord20Service struct {
	repo *repository.ReportRecord20Repository
}

// NewReportRecord20Service wires the service.
func NewReportRecord20Service(repo *repository.ReportRecord20Repository) *ReportRecord20Service {
	return &ReportRecord20Service{repo: repo}
}

// Create validates and persists a new ReportRecord20.
func (s *ReportRecord20Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord20, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord20{
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

// Get returns a ReportRecord20 by id.
func (s *ReportRecord20Service) Get(ctx context.Context, id string) (*models.ReportRecord20, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord20 pages.
func (s *ReportRecord20Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord20, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord20.
func (s *ReportRecord20Service) Update(ctx context.Context, actor string, rec *models.ReportRecord20) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord20.
func (s *ReportRecord20Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord20 by external code prefix.
func (s *ReportRecord20Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord20, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord20Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
