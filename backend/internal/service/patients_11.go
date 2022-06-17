package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord11Service encapsulates business rules for PatientRecord11.
type PatientRecord11Service struct {
	repo *repository.PatientRecord11Repository
}

// NewPatientRecord11Service wires the service.
func NewPatientRecord11Service(repo *repository.PatientRecord11Repository) *PatientRecord11Service {
	return &PatientRecord11Service{repo: repo}
}

// Create validates and persists a new PatientRecord11.
func (s *PatientRecord11Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord11, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord11{
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

// Get returns a PatientRecord11 by id.
func (s *PatientRecord11Service) Get(ctx context.Context, id string) (*models.PatientRecord11, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord11 pages.
func (s *PatientRecord11Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord11, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord11.
func (s *PatientRecord11Service) Update(ctx context.Context, actor string, rec *models.PatientRecord11) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord11.
func (s *PatientRecord11Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord11 by external code prefix.
func (s *PatientRecord11Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord11, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord11Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
