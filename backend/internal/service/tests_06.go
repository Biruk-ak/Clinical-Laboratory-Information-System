package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord06Service encapsulates business rules for LabTestRecord06.
type LabTestRecord06Service struct {
	repo *repository.LabTestRecord06Repository
}

// NewLabTestRecord06Service wires the service.
func NewLabTestRecord06Service(repo *repository.LabTestRecord06Repository) *LabTestRecord06Service {
	return &LabTestRecord06Service{repo: repo}
}

// Create validates and persists a new LabTestRecord06.
func (s *LabTestRecord06Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord06, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord06{
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

// Get returns a LabTestRecord06 by id.
func (s *LabTestRecord06Service) Get(ctx context.Context, id string) (*models.LabTestRecord06, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord06 pages.
func (s *LabTestRecord06Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord06, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord06.
func (s *LabTestRecord06Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord06) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord06.
func (s *LabTestRecord06Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord06 by external code prefix.
func (s *LabTestRecord06Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord06, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord06Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
