package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord27Service encapsulates business rules for PatientRecord27.
type PatientRecord27Service struct {
	repo *repository.PatientRecord27Repository
}

// NewPatientRecord27Service wires the service.
func NewPatientRecord27Service(repo *repository.PatientRecord27Repository) *PatientRecord27Service {
	return &PatientRecord27Service{repo: repo}
}

// Create validates and persists a new PatientRecord27.
func (s *PatientRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord27, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord27{
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

// Get returns a PatientRecord27 by id.
func (s *PatientRecord27Service) Get(ctx context.Context, id string) (*models.PatientRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord27 pages.
func (s *PatientRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord27.
func (s *PatientRecord27Service) Update(ctx context.Context, actor string, rec *models.PatientRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord27.
func (s *PatientRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord27 by external code prefix.
func (s *PatientRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
