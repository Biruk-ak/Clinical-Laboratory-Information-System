package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord24Service encapsulates business rules for HospitalRecord24.
type HospitalRecord24Service struct {
	repo *repository.HospitalRecord24Repository
}

// NewHospitalRecord24Service wires the service.
func NewHospitalRecord24Service(repo *repository.HospitalRecord24Repository) *HospitalRecord24Service {
	return &HospitalRecord24Service{repo: repo}
}

// Create validates and persists a new HospitalRecord24.
func (s *HospitalRecord24Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord24, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord24{
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

// Get returns a HospitalRecord24 by id.
func (s *HospitalRecord24Service) Get(ctx context.Context, id string) (*models.HospitalRecord24, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord24 pages.
func (s *HospitalRecord24Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord24, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord24.
func (s *HospitalRecord24Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord24) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord24.
func (s *HospitalRecord24Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord24 by external code prefix.
func (s *HospitalRecord24Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord24, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord24Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
