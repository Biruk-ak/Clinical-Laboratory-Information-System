package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord10Service encapsulates business rules for HospitalRecord10.
type HospitalRecord10Service struct {
	repo *repository.HospitalRecord10Repository
}

// NewHospitalRecord10Service wires the service.
func NewHospitalRecord10Service(repo *repository.HospitalRecord10Repository) *HospitalRecord10Service {
	return &HospitalRecord10Service{repo: repo}
}

// Create validates and persists a new HospitalRecord10.
func (s *HospitalRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord10, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord10{
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

// Get returns a HospitalRecord10 by id.
func (s *HospitalRecord10Service) Get(ctx context.Context, id string) (*models.HospitalRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord10 pages.
func (s *HospitalRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord10.
func (s *HospitalRecord10Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord10.
func (s *HospitalRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord10 by external code prefix.
func (s *HospitalRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
