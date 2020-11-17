package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord08Service encapsulates business rules for SampleRecord08.
type SampleRecord08Service struct {
	repo *repository.SampleRecord08Repository
}

// NewSampleRecord08Service wires the service.
func NewSampleRecord08Service(repo *repository.SampleRecord08Repository) *SampleRecord08Service {
	return &SampleRecord08Service{repo: repo}
}

// Create validates and persists a new SampleRecord08.
func (s *SampleRecord08Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord08, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord08{
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

// Get returns a SampleRecord08 by id.
func (s *SampleRecord08Service) Get(ctx context.Context, id string) (*models.SampleRecord08, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord08 pages.
func (s *SampleRecord08Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord08, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord08.
func (s *SampleRecord08Service) Update(ctx context.Context, actor string, rec *models.SampleRecord08) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord08.
func (s *SampleRecord08Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord08 by external code prefix.
func (s *SampleRecord08Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord08, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord08Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
