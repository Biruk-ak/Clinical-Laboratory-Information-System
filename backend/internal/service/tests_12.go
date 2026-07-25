package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord12Service encapsulates business rules for LabTestRecord12.
type LabTestRecord12Service struct {
	repo *repository.LabTestRecord12Repository
}

// NewLabTestRecord12Service wires the service.
func NewLabTestRecord12Service(repo *repository.LabTestRecord12Repository) *LabTestRecord12Service {
	return &LabTestRecord12Service{repo: repo}
}

// Create validates and persists a new LabTestRecord12.
func (s *LabTestRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord12, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord12{
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

// Get returns a LabTestRecord12 by id.
func (s *LabTestRecord12Service) Get(ctx context.Context, id string) (*models.LabTestRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord12 pages.
func (s *LabTestRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord12.
func (s *LabTestRecord12Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord12.
func (s *LabTestRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord12 by external code prefix.
func (s *LabTestRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
