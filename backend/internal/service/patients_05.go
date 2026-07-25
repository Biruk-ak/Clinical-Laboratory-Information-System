package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// PatientRecord05Service encapsulates business rules for PatientRecord05.
type PatientRecord05Service struct {
	repo *repository.PatientRecord05Repository
}

// NewPatientRecord05Service wires the service.
func NewPatientRecord05Service(repo *repository.PatientRecord05Repository) *PatientRecord05Service {
	return &PatientRecord05Service{repo: repo}
}

// Create validates and persists a new PatientRecord05.
func (s *PatientRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.PatientRecord05, error) {
	now := time.Now().UTC()
	rec := &models.PatientRecord05{
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

// Get returns a PatientRecord05 by id.
func (s *PatientRecord05Service) Get(ctx context.Context, id string) (*models.PatientRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped PatientRecord05 pages.
func (s *PatientRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.PatientRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing PatientRecord05.
func (s *PatientRecord05Service) Update(ctx context.Context, actor string, rec *models.PatientRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a PatientRecord05.
func (s *PatientRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds PatientRecord05 by external code prefix.
func (s *PatientRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.PatientRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *PatientRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
