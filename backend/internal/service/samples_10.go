package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord10Service encapsulates business rules for SampleRecord10.
type SampleRecord10Service struct {
	repo *repository.SampleRecord10Repository
}

// NewSampleRecord10Service wires the service.
func NewSampleRecord10Service(repo *repository.SampleRecord10Repository) *SampleRecord10Service {
	return &SampleRecord10Service{repo: repo}
}

// Create validates and persists a new SampleRecord10.
func (s *SampleRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord10, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord10{
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

// Get returns a SampleRecord10 by id.
func (s *SampleRecord10Service) Get(ctx context.Context, id string) (*models.SampleRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord10 pages.
func (s *SampleRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord10.
func (s *SampleRecord10Service) Update(ctx context.Context, actor string, rec *models.SampleRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord10.
func (s *SampleRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord10 by external code prefix.
func (s *SampleRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
