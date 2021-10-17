package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord17Service encapsulates business rules for HospitalRecord17.
type HospitalRecord17Service struct {
	repo *repository.HospitalRecord17Repository
}

// NewHospitalRecord17Service wires the service.
func NewHospitalRecord17Service(repo *repository.HospitalRecord17Repository) *HospitalRecord17Service {
	return &HospitalRecord17Service{repo: repo}
}

// Create validates and persists a new HospitalRecord17.
func (s *HospitalRecord17Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord17, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord17{
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

// Get returns a HospitalRecord17 by id.
func (s *HospitalRecord17Service) Get(ctx context.Context, id string) (*models.HospitalRecord17, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord17 pages.
func (s *HospitalRecord17Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord17, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord17.
func (s *HospitalRecord17Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord17) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord17.
func (s *HospitalRecord17Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord17 by external code prefix.
func (s *HospitalRecord17Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord17, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord17Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
