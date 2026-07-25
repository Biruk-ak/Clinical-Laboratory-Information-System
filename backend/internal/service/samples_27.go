package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord27Service encapsulates business rules for SampleRecord27.
type SampleRecord27Service struct {
	repo *repository.SampleRecord27Repository
}

// NewSampleRecord27Service wires the service.
func NewSampleRecord27Service(repo *repository.SampleRecord27Repository) *SampleRecord27Service {
	return &SampleRecord27Service{repo: repo}
}

// Create validates and persists a new SampleRecord27.
func (s *SampleRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord27, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord27{
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

// Get returns a SampleRecord27 by id.
func (s *SampleRecord27Service) Get(ctx context.Context, id string) (*models.SampleRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord27 pages.
func (s *SampleRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord27.
func (s *SampleRecord27Service) Update(ctx context.Context, actor string, rec *models.SampleRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord27.
func (s *SampleRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord27 by external code prefix.
func (s *SampleRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
