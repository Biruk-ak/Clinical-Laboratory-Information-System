package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord24Service encapsulates business rules for PatientRecord24.
type PatientRecord24Service struct {
	repo *repository.PatientRecord24Repository
}

// NewPatientRecord24Service wires the service.
func NewPatientRecord24Service(repo *repository.PatientRecord24Repository) *PatientRecord24Service {
	return &PatientRecord24Service{repo: repo}
}

// Create validates and persists a new PatientRecord24.
func (s *PatientRecord24Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord24, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord24{
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

// Get returns a PatientRecord24 by id.
func (s *PatientRecord24Service) Get(ctx context.Context, id string) (*models.PatientRecord24, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord24 pages.
func (s *PatientRecord24Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord24, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord24.
func (s *PatientRecord24Service) Update(ctx context.Context, actor string, rec *models.PatientRecord24) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord24.
func (s *PatientRecord24Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord24 by external code prefix.
func (s *PatientRecord24Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord24, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord24Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
