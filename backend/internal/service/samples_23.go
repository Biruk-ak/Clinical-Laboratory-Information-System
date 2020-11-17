package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord23Service encapsulates business rules for SampleRecord23.
type SampleRecord23Service struct {
	repo *repository.SampleRecord23Repository
}

// NewSampleRecord23Service wires the service.
func NewSampleRecord23Service(repo *repository.SampleRecord23Repository) *SampleRecord23Service {
	return &SampleRecord23Service{repo: repo}
}

// Create validates and persists a new SampleRecord23.
func (s *SampleRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord23, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord23{
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

// Get returns a SampleRecord23 by id.
func (s *SampleRecord23Service) Get(ctx context.Context, id string) (*models.SampleRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord23 pages.
func (s *SampleRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord23.
func (s *SampleRecord23Service) Update(ctx context.Context, actor string, rec *models.SampleRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord23.
func (s *SampleRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord23 by external code prefix.
func (s *SampleRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
