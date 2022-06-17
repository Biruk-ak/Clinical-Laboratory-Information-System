package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord12Service encapsulates business rules for PatientRecord12.
type PatientRecord12Service struct {
	repo *repository.PatientRecord12Repository
}

// NewPatientRecord12Service wires the service.
func NewPatientRecord12Service(repo *repository.PatientRecord12Repository) *PatientRecord12Service {
	return &PatientRecord12Service{repo: repo}
}

// Create validates and persists a new PatientRecord12.
func (s *PatientRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord12, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord12{
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

// Get returns a PatientRecord12 by id.
func (s *PatientRecord12Service) Get(ctx context.Context, id string) (*models.PatientRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord12 pages.
func (s *PatientRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord12.
func (s *PatientRecord12Service) Update(ctx context.Context, actor string, rec *models.PatientRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord12.
func (s *PatientRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord12 by external code prefix.
func (s *PatientRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
