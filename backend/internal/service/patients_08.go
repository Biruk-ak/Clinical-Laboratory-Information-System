package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord08Service encapsulates business rules for PatientRecord08.
type PatientRecord08Service struct {
	repo *repository.PatientRecord08Repository
}

// NewPatientRecord08Service wires the service.
func NewPatientRecord08Service(repo *repository.PatientRecord08Repository) *PatientRecord08Service {
	return &PatientRecord08Service{repo: repo}
}

// Create validates and persists a new PatientRecord08.
func (s *PatientRecord08Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord08, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord08{
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

// Get returns a PatientRecord08 by id.
func (s *PatientRecord08Service) Get(ctx context.Context, id string) (*models.PatientRecord08, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord08 pages.
func (s *PatientRecord08Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord08, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord08.
func (s *PatientRecord08Service) Update(ctx context.Context, actor string, rec *models.PatientRecord08) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord08.
func (s *PatientRecord08Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord08 by external code prefix.
func (s *PatientRecord08Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord08, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord08Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
