package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord25Service encapsulates business rules for PatientRecord25.
type PatientRecord25Service struct {
	repo *repository.PatientRecord25Repository
}

// NewPatientRecord25Service wires the service.
func NewPatientRecord25Service(repo *repository.PatientRecord25Repository) *PatientRecord25Service {
	return &PatientRecord25Service{repo: repo}
}

// Create validates and persists a new PatientRecord25.
func (s *PatientRecord25Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord25, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord25{
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

// Get returns a PatientRecord25 by id.
func (s *PatientRecord25Service) Get(ctx context.Context, id string) (*models.PatientRecord25, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord25 pages.
func (s *PatientRecord25Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord25, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord25.
func (s *PatientRecord25Service) Update(ctx context.Context, actor string, rec *models.PatientRecord25) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord25.
func (s *PatientRecord25Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord25 by external code prefix.
func (s *PatientRecord25Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord25, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord25Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
