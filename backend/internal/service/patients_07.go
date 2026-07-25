package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord07Service encapsulates business rules for PatientRecord07.
type PatientRecord07Service struct {
	repo *repository.PatientRecord07Repository
}

// NewPatientRecord07Service wires the service.
func NewPatientRecord07Service(repo *repository.PatientRecord07Repository) *PatientRecord07Service {
	return &PatientRecord07Service{repo: repo}
}

// Create validates and persists a new PatientRecord07.
func (s *PatientRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord07, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord07{
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

// Get returns a PatientRecord07 by id.
func (s *PatientRecord07Service) Get(ctx context.Context, id string) (*models.PatientRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord07 pages.
func (s *PatientRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord07.
func (s *PatientRecord07Service) Update(ctx context.Context, actor string, rec *models.PatientRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord07.
func (s *PatientRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord07 by external code prefix.
func (s *PatientRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
