package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord17Service encapsulates business rules for DoctorRecord17.
type DoctorRecord17Service struct {
	repo *repository.DoctorRecord17Repository
}

// NewDoctorRecord17Service wires the service.
func NewDoctorRecord17Service(repo *repository.DoctorRecord17Repository) *DoctorRecord17Service {
	return &DoctorRecord17Service{repo: repo}
}

// Create validates and persists a new DoctorRecord17.
func (s *DoctorRecord17Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord17, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord17{
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

// Get returns a DoctorRecord17 by id.
func (s *DoctorRecord17Service) Get(ctx context.Context, id string) (*models.DoctorRecord17, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord17 pages.
func (s *DoctorRecord17Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord17, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord17.
func (s *DoctorRecord17Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord17) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord17.
func (s *DoctorRecord17Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord17 by external code prefix.
func (s *DoctorRecord17Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord17, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord17Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
