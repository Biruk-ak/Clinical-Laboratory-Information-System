package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord18Service encapsulates business rules for SampleRecord18.
type SampleRecord18Service struct {
	repo *repository.SampleRecord18Repository
}

// NewSampleRecord18Service wires the service.
func NewSampleRecord18Service(repo *repository.SampleRecord18Repository) *SampleRecord18Service {
	return &SampleRecord18Service{repo: repo}
}

// Create validates and persists a new SampleRecord18.
func (s *SampleRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord18, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord18{
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

// Get returns a SampleRecord18 by id.
func (s *SampleRecord18Service) Get(ctx context.Context, id string) (*models.SampleRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord18 pages.
func (s *SampleRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord18.
func (s *SampleRecord18Service) Update(ctx context.Context, actor string, rec *models.SampleRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord18.
func (s *SampleRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord18 by external code prefix.
func (s *SampleRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
