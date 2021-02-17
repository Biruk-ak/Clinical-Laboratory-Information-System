package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord10Service encapsulates business rules for LabTestRecord10.
type LabTestRecord10Service struct {
	repo *repository.LabTestRecord10Repository
}

// NewLabTestRecord10Service wires the service.
func NewLabTestRecord10Service(repo *repository.LabTestRecord10Repository) *LabTestRecord10Service {
	return &LabTestRecord10Service{repo: repo}
}

// Create validates and persists a new LabTestRecord10.
func (s *LabTestRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord10, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord10{
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

// Get returns a LabTestRecord10 by id.
func (s *LabTestRecord10Service) Get(ctx context.Context, id string) (*models.LabTestRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord10 pages.
func (s *LabTestRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord10.
func (s *LabTestRecord10Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord10.
func (s *LabTestRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord10 by external code prefix.
func (s *LabTestRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
