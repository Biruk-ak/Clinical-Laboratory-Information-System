package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord22Service encapsulates business rules for PatientRecord22.
type PatientRecord22Service struct {
	repo *repository.PatientRecord22Repository
}

// NewPatientRecord22Service wires the service.
func NewPatientRecord22Service(repo *repository.PatientRecord22Repository) *PatientRecord22Service {
	return &PatientRecord22Service{repo: repo}
}

// Create validates and persists a new PatientRecord22.
func (s *PatientRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord22, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord22{
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

// Get returns a PatientRecord22 by id.
func (s *PatientRecord22Service) Get(ctx context.Context, id string) (*models.PatientRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord22 pages.
func (s *PatientRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord22.
func (s *PatientRecord22Service) Update(ctx context.Context, actor string, rec *models.PatientRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord22.
func (s *PatientRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord22 by external code prefix.
func (s *PatientRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
