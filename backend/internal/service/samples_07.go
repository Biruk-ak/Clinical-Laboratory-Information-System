package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord07Service encapsulates business rules for SampleRecord07.
type SampleRecord07Service struct {
	repo *repository.SampleRecord07Repository
}

// NewSampleRecord07Service wires the service.
func NewSampleRecord07Service(repo *repository.SampleRecord07Repository) *SampleRecord07Service {
	return &SampleRecord07Service{repo: repo}
}

// Create validates and persists a new SampleRecord07.
func (s *SampleRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord07, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord07{
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

// Get returns a SampleRecord07 by id.
func (s *SampleRecord07Service) Get(ctx context.Context, id string) (*models.SampleRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord07 pages.
func (s *SampleRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord07.
func (s *SampleRecord07Service) Update(ctx context.Context, actor string, rec *models.SampleRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord07.
func (s *SampleRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord07 by external code prefix.
func (s *SampleRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
