package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord13Service encapsulates business rules for SampleRecord13.
type SampleRecord13Service struct {
	repo *repository.SampleRecord13Repository
}

// NewSampleRecord13Service wires the service.
func NewSampleRecord13Service(repo *repository.SampleRecord13Repository) *SampleRecord13Service {
	return &SampleRecord13Service{repo: repo}
}

// Create validates and persists a new SampleRecord13.
func (s *SampleRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord13, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord13{
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

// Get returns a SampleRecord13 by id.
func (s *SampleRecord13Service) Get(ctx context.Context, id string) (*models.SampleRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord13 pages.
func (s *SampleRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord13.
func (s *SampleRecord13Service) Update(ctx context.Context, actor string, rec *models.SampleRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord13.
func (s *SampleRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord13 by external code prefix.
func (s *SampleRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
