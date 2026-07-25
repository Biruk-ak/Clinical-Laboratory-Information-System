package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord14Service encapsulates business rules for SampleRecord14.
type SampleRecord14Service struct {
	repo *repository.SampleRecord14Repository
}

// NewSampleRecord14Service wires the service.
func NewSampleRecord14Service(repo *repository.SampleRecord14Repository) *SampleRecord14Service {
	return &SampleRecord14Service{repo: repo}
}

// Create validates and persists a new SampleRecord14.
func (s *SampleRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord14, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord14{
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

// Get returns a SampleRecord14 by id.
func (s *SampleRecord14Service) Get(ctx context.Context, id string) (*models.SampleRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord14 pages.
func (s *SampleRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord14.
func (s *SampleRecord14Service) Update(ctx context.Context, actor string, rec *models.SampleRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord14.
func (s *SampleRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord14 by external code prefix.
func (s *SampleRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
