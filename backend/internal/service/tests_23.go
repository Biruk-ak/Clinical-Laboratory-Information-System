package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord23Service encapsulates business rules for LabTestRecord23.
type LabTestRecord23Service struct {
	repo *repository.LabTestRecord23Repository
}

// NewLabTestRecord23Service wires the service.
func NewLabTestRecord23Service(repo *repository.LabTestRecord23Repository) *LabTestRecord23Service {
	return &LabTestRecord23Service{repo: repo}
}

// Create validates and persists a new LabTestRecord23.
func (s *LabTestRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord23, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord23{
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

// Get returns a LabTestRecord23 by id.
func (s *LabTestRecord23Service) Get(ctx context.Context, id string) (*models.LabTestRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord23 pages.
func (s *LabTestRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord23.
func (s *LabTestRecord23Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord23.
func (s *LabTestRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord23 by external code prefix.
func (s *LabTestRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
