package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// SampleRecord15Service encapsulates business rules for SampleRecord15.
type SampleRecord15Service struct {
	repo *repository.SampleRecord15Repository
}

// NewSampleRecord15Service wires the service.
func NewSampleRecord15Service(repo *repository.SampleRecord15Repository) *SampleRecord15Service {
	return &SampleRecord15Service{repo: repo}
}

// Create validates and persists a new SampleRecord15.
func (s *SampleRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.SampleRecord15, error) {
	now := time.Now().UTC()
	rec := &models.SampleRecord15{
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

// Get returns a SampleRecord15 by id.
func (s *SampleRecord15Service) Get(ctx context.Context, id string) (*models.SampleRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped SampleRecord15 pages.
func (s *SampleRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.SampleRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing SampleRecord15.
func (s *SampleRecord15Service) Update(ctx context.Context, actor string, rec *models.SampleRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a SampleRecord15.
func (s *SampleRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds SampleRecord15 by external code prefix.
func (s *SampleRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.SampleRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *SampleRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
