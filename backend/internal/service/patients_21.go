package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord21Service encapsulates business rules for PatientRecord21.
type PatientRecord21Service struct {
	repo *repository.PatientRecord21Repository
}

// NewPatientRecord21Service wires the service.
func NewPatientRecord21Service(repo *repository.PatientRecord21Repository) *PatientRecord21Service {
	return &PatientRecord21Service{repo: repo}
}

// Create validates and persists a new PatientRecord21.
func (s *PatientRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord21, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord21{
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

// Get returns a PatientRecord21 by id.
func (s *PatientRecord21Service) Get(ctx context.Context, id string) (*models.PatientRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord21 pages.
func (s *PatientRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord21.
func (s *PatientRecord21Service) Update(ctx context.Context, actor string, rec *models.PatientRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord21.
func (s *PatientRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord21 by external code prefix.
func (s *PatientRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
