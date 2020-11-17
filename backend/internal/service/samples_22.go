package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord22Service encapsulates business rules for SampleRecord22.
type SampleRecord22Service struct {
	repo *repository.SampleRecord22Repository
}

// NewSampleRecord22Service wires the service.
func NewSampleRecord22Service(repo *repository.SampleRecord22Repository) *SampleRecord22Service {
	return &SampleRecord22Service{repo: repo}
}

// Create validates and persists a new SampleRecord22.
func (s *SampleRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord22, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord22{
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

// Get returns a SampleRecord22 by id.
func (s *SampleRecord22Service) Get(ctx context.Context, id string) (*models.SampleRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord22 pages.
func (s *SampleRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord22.
func (s *SampleRecord22Service) Update(ctx context.Context, actor string, rec *models.SampleRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord22.
func (s *SampleRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord22 by external code prefix.
func (s *SampleRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
