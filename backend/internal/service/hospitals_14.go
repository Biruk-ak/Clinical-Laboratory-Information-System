package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord14Service encapsulates business rules for HospitalRecord14.
type HospitalRecord14Service struct {
	repo *repository.HospitalRecord14Repository
}

// NewHospitalRecord14Service wires the service.
func NewHospitalRecord14Service(repo *repository.HospitalRecord14Repository) *HospitalRecord14Service {
	return &HospitalRecord14Service{repo: repo}
}

// Create validates and persists a new HospitalRecord14.
func (s *HospitalRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord14, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord14{
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

// Get returns a HospitalRecord14 by id.
func (s *HospitalRecord14Service) Get(ctx context.Context, id string) (*models.HospitalRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord14 pages.
func (s *HospitalRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord14.
func (s *HospitalRecord14Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord14.
func (s *HospitalRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord14 by external code prefix.
func (s *HospitalRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
