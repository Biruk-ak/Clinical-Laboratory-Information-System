package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord14Service encapsulates business rules for PatientRecord14.
type PatientRecord14Service struct {
	repo *repository.PatientRecord14Repository
}

// NewPatientRecord14Service wires the service.
func NewPatientRecord14Service(repo *repository.PatientRecord14Repository) *PatientRecord14Service {
	return &PatientRecord14Service{repo: repo}
}

// Create validates and persists a new PatientRecord14.
func (s *PatientRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord14, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord14{
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

// Get returns a PatientRecord14 by id.
func (s *PatientRecord14Service) Get(ctx context.Context, id string) (*models.PatientRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord14 pages.
func (s *PatientRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord14.
func (s *PatientRecord14Service) Update(ctx context.Context, actor string, rec *models.PatientRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord14.
func (s *PatientRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord14 by external code prefix.
func (s *PatientRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
