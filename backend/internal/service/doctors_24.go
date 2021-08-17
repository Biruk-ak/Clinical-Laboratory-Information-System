package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord24Service encapsulates business rules for DoctorRecord24.
type DoctorRecord24Service struct {
	repo *repository.DoctorRecord24Repository
}

// NewDoctorRecord24Service wires the service.
func NewDoctorRecord24Service(repo *repository.DoctorRecord24Repository) *DoctorRecord24Service {
	return &DoctorRecord24Service{repo: repo}
}

// Create validates and persists a new DoctorRecord24.
func (s *DoctorRecord24Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord24, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord24{
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

// Get returns a DoctorRecord24 by id.
func (s *DoctorRecord24Service) Get(ctx context.Context, id string) (*models.DoctorRecord24, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord24 pages.
func (s *DoctorRecord24Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord24, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord24.
func (s *DoctorRecord24Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord24) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord24.
func (s *DoctorRecord24Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord24 by external code prefix.
func (s *DoctorRecord24Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord24, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord24Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
