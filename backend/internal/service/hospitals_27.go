package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord27Service encapsulates business rules for HospitalRecord27.
type HospitalRecord27Service struct {
	repo *repository.HospitalRecord27Repository
}

// NewHospitalRecord27Service wires the service.
func NewHospitalRecord27Service(repo *repository.HospitalRecord27Repository) *HospitalRecord27Service {
	return &HospitalRecord27Service{repo: repo}
}

// Create validates and persists a new HospitalRecord27.
func (s *HospitalRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord27, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord27{
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

// Get returns a HospitalRecord27 by id.
func (s *HospitalRecord27Service) Get(ctx context.Context, id string) (*models.HospitalRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord27 pages.
func (s *HospitalRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord27.
func (s *HospitalRecord27Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord27.
func (s *HospitalRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord27 by external code prefix.
func (s *HospitalRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
