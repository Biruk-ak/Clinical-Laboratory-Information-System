package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord02Service encapsulates business rules for SampleRecord02.
type SampleRecord02Service struct {
	repo *repository.SampleRecord02Repository
}

// NewSampleRecord02Service wires the service.
func NewSampleRecord02Service(repo *repository.SampleRecord02Repository) *SampleRecord02Service {
	return &SampleRecord02Service{repo: repo}
}

// Create validates and persists a new SampleRecord02.
func (s *SampleRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord02, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord02{
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

// Get returns a SampleRecord02 by id.
func (s *SampleRecord02Service) Get(ctx context.Context, id string) (*models.SampleRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord02 pages.
func (s *SampleRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord02.
func (s *SampleRecord02Service) Update(ctx context.Context, actor string, rec *models.SampleRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord02.
func (s *SampleRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord02 by external code prefix.
func (s *SampleRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
