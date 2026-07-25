package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord06Service encapsulates business rules for HospitalRecord06.
type HospitalRecord06Service struct {
	repo *repository.HospitalRecord06Repository
}

// NewHospitalRecord06Service wires the service.
func NewHospitalRecord06Service(repo *repository.HospitalRecord06Repository) *HospitalRecord06Service {
	return &HospitalRecord06Service{repo: repo}
}

// Create validates and persists a new HospitalRecord06.
func (s *HospitalRecord06Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord06, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord06{
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

// Get returns a HospitalRecord06 by id.
func (s *HospitalRecord06Service) Get(ctx context.Context, id string) (*models.HospitalRecord06, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord06 pages.
func (s *HospitalRecord06Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord06, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord06.
func (s *HospitalRecord06Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord06) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord06.
func (s *HospitalRecord06Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord06 by external code prefix.
func (s *HospitalRecord06Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord06, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord06Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
