package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord22Service encapsulates business rules for LabTestRecord22.
type LabTestRecord22Service struct {
	repo *repository.LabTestRecord22Repository
}

// NewLabTestRecord22Service wires the service.
func NewLabTestRecord22Service(repo *repository.LabTestRecord22Repository) *LabTestRecord22Service {
	return &LabTestRecord22Service{repo: repo}
}

// Create validates and persists a new LabTestRecord22.
func (s *LabTestRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord22, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord22{
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

// Get returns a LabTestRecord22 by id.
func (s *LabTestRecord22Service) Get(ctx context.Context, id string) (*models.LabTestRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord22 pages.
func (s *LabTestRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord22.
func (s *LabTestRecord22Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord22.
func (s *LabTestRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord22 by external code prefix.
func (s *LabTestRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
