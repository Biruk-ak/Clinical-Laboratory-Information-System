package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord25Service encapsulates business rules for HospitalRecord25.
type HospitalRecord25Service struct {
	repo *repository.HospitalRecord25Repository
}

// NewHospitalRecord25Service wires the service.
func NewHospitalRecord25Service(repo *repository.HospitalRecord25Repository) *HospitalRecord25Service {
	return &HospitalRecord25Service{repo: repo}
}

// Create validates and persists a new HospitalRecord25.
func (s *HospitalRecord25Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord25, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord25{
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

// Get returns a HospitalRecord25 by id.
func (s *HospitalRecord25Service) Get(ctx context.Context, id string) (*models.HospitalRecord25, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord25 pages.
func (s *HospitalRecord25Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord25, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord25.
func (s *HospitalRecord25Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord25) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord25.
func (s *HospitalRecord25Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord25 by external code prefix.
func (s *HospitalRecord25Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord25, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord25Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
