package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord07Service encapsulates business rules for HospitalRecord07.
type HospitalRecord07Service struct {
	repo *repository.HospitalRecord07Repository
}

// NewHospitalRecord07Service wires the service.
func NewHospitalRecord07Service(repo *repository.HospitalRecord07Repository) *HospitalRecord07Service {
	return &HospitalRecord07Service{repo: repo}
}

// Create validates and persists a new HospitalRecord07.
func (s *HospitalRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord07, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord07{
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

// Get returns a HospitalRecord07 by id.
func (s *HospitalRecord07Service) Get(ctx context.Context, id string) (*models.HospitalRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord07 pages.
func (s *HospitalRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord07.
func (s *HospitalRecord07Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord07.
func (s *HospitalRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord07 by external code prefix.
func (s *HospitalRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
