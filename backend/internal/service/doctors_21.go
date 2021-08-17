package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord21Service encapsulates business rules for DoctorRecord21.
type DoctorRecord21Service struct {
	repo *repository.DoctorRecord21Repository
}

// NewDoctorRecord21Service wires the service.
func NewDoctorRecord21Service(repo *repository.DoctorRecord21Repository) *DoctorRecord21Service {
	return &DoctorRecord21Service{repo: repo}
}

// Create validates and persists a new DoctorRecord21.
func (s *DoctorRecord21Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord21, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord21{
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

// Get returns a DoctorRecord21 by id.
func (s *DoctorRecord21Service) Get(ctx context.Context, id string) (*models.DoctorRecord21, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord21 pages.
func (s *DoctorRecord21Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord21, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord21.
func (s *DoctorRecord21Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord21) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord21.
func (s *DoctorRecord21Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord21 by external code prefix.
func (s *DoctorRecord21Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord21, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord21Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
