package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord11Service encapsulates business rules for LabTestRecord11.
type LabTestRecord11Service struct {
	repo *repository.LabTestRecord11Repository
}

// NewLabTestRecord11Service wires the service.
func NewLabTestRecord11Service(repo *repository.LabTestRecord11Repository) *LabTestRecord11Service {
	return &LabTestRecord11Service{repo: repo}
}

// Create validates and persists a new LabTestRecord11.
func (s *LabTestRecord11Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord11, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord11{
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

// Get returns a LabTestRecord11 by id.
func (s *LabTestRecord11Service) Get(ctx context.Context, id string) (*models.LabTestRecord11, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord11 pages.
func (s *LabTestRecord11Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord11, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord11.
func (s *LabTestRecord11Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord11) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord11.
func (s *LabTestRecord11Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord11 by external code prefix.
func (s *LabTestRecord11Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord11, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord11Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
