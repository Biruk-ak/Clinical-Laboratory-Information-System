package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord21Service encapsulates business rules for SampleRecord21.
type SampleRecord21Service struct {
	repo *repository.SampleRecord21Repository
}

// NewSampleRecord21Service wires the service.
func NewSampleRecord21Service(repo *repository.SampleRecord21Repository) *SampleRecord21Service {
	return &SampleRecord21Service{repo: repo}
}

// Create validates and persists a new SampleRecord21.
func (s *SampleRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord21, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord21{
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

// Get returns a SampleRecord21 by id.
func (s *SampleRecord21Service) Get(ctx context.Context, id string) (*models.SampleRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord21 pages.
func (s *SampleRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord21.
func (s *SampleRecord21Service) Update(ctx context.Context, actor string, rec *models.SampleRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord21.
func (s *SampleRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord21 by external code prefix.
func (s *SampleRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
