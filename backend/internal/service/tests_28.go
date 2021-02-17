package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord28Service encapsulates business rules for LabTestRecord28.
type LabTestRecord28Service struct {
	repo *repository.LabTestRecord28Repository
}

// NewLabTestRecord28Service wires the service.
func NewLabTestRecord28Service(repo *repository.LabTestRecord28Repository) *LabTestRecord28Service {
	return &LabTestRecord28Service{repo: repo}
}

// Create validates and persists a new LabTestRecord28.
func (s *LabTestRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord28, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord28{
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

// Get returns a LabTestRecord28 by id.
func (s *LabTestRecord28Service) Get(ctx context.Context, id string) (*models.LabTestRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord28 pages.
func (s *LabTestRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord28.
func (s *LabTestRecord28Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord28.
func (s *LabTestRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord28 by external code prefix.
func (s *LabTestRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
