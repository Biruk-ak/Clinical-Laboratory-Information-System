package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord18Service encapsulates business rules for PatientRecord18.
type PatientRecord18Service struct {
	repo *repository.PatientRecord18Repository
}

// NewPatientRecord18Service wires the service.
func NewPatientRecord18Service(repo *repository.PatientRecord18Repository) *PatientRecord18Service {
	return &PatientRecord18Service{repo: repo}
}

// Create validates and persists a new PatientRecord18.
func (s *PatientRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord18, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord18{
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

// Get returns a PatientRecord18 by id.
func (s *PatientRecord18Service) Get(ctx context.Context, id string) (*models.PatientRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord18 pages.
func (s *PatientRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord18.
func (s *PatientRecord18Service) Update(ctx context.Context, actor string, rec *models.PatientRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord18.
func (s *PatientRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord18 by external code prefix.
func (s *PatientRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
