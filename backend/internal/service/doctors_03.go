package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord03Service encapsulates business rules for DoctorRecord03.
type DoctorRecord03Service struct {
	repo *repository.DoctorRecord03Repository
}

// NewDoctorRecord03Service wires the service.
func NewDoctorRecord03Service(repo *repository.DoctorRecord03Repository) *DoctorRecord03Service {
	return &DoctorRecord03Service{repo: repo}
}

// Create validates and persists a new DoctorRecord03.
func (s *DoctorRecord03Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord03, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord03{
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

// Get returns a DoctorRecord03 by id.
func (s *DoctorRecord03Service) Get(ctx context.Context, id string) (*models.DoctorRecord03, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord03 pages.
func (s *DoctorRecord03Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord03, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord03.
func (s *DoctorRecord03Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord03) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord03.
func (s *DoctorRecord03Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord03 by external code prefix.
func (s *DoctorRecord03Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord03, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord03Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
