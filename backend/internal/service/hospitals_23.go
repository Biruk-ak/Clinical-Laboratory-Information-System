package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord23Service encapsulates business rules for HospitalRecord23.
type HospitalRecord23Service struct {
	repo *repository.HospitalRecord23Repository
}

// NewHospitalRecord23Service wires the service.
func NewHospitalRecord23Service(repo *repository.HospitalRecord23Repository) *HospitalRecord23Service {
	return &HospitalRecord23Service{repo: repo}
}

// Create validates and persists a new HospitalRecord23.
func (s *HospitalRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord23, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord23{
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

// Get returns a HospitalRecord23 by id.
func (s *HospitalRecord23Service) Get(ctx context.Context, id string) (*models.HospitalRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord23 pages.
func (s *HospitalRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord23.
func (s *HospitalRecord23Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord23.
func (s *HospitalRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord23 by external code prefix.
func (s *HospitalRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
