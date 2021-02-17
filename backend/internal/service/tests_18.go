package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord18Service encapsulates business rules for LabTestRecord18.
type LabTestRecord18Service struct {
	repo *repository.LabTestRecord18Repository
}

// NewLabTestRecord18Service wires the service.
func NewLabTestRecord18Service(repo *repository.LabTestRecord18Repository) *LabTestRecord18Service {
	return &LabTestRecord18Service{repo: repo}
}

// Create validates and persists a new LabTestRecord18.
func (s *LabTestRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord18, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord18{
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

// Get returns a LabTestRecord18 by id.
func (s *LabTestRecord18Service) Get(ctx context.Context, id string) (*models.LabTestRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord18 pages.
func (s *LabTestRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord18.
func (s *LabTestRecord18Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord18.
func (s *LabTestRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord18 by external code prefix.
func (s *LabTestRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
