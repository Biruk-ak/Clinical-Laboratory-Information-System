package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord01Service encapsulates business rules for LabTestRecord01.
type LabTestRecord01Service struct {
	repo *repository.LabTestRecord01Repository
}

// NewLabTestRecord01Service wires the service.
func NewLabTestRecord01Service(repo *repository.LabTestRecord01Repository) *LabTestRecord01Service {
	return &LabTestRecord01Service{repo: repo}
}

// Create validates and persists a new LabTestRecord01.
func (s *LabTestRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord01, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord01{
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

// Get returns a LabTestRecord01 by id.
func (s *LabTestRecord01Service) Get(ctx context.Context, id string) (*models.LabTestRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord01 pages.
func (s *LabTestRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord01.
func (s *LabTestRecord01Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord01.
func (s *LabTestRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord01 by external code prefix.
func (s *LabTestRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
