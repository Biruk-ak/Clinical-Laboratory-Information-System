package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord02Service encapsulates business rules for HospitalRecord02.
type HospitalRecord02Service struct {
	repo *repository.HospitalRecord02Repository
}

// NewHospitalRecord02Service wires the service.
func NewHospitalRecord02Service(repo *repository.HospitalRecord02Repository) *HospitalRecord02Service {
	return &HospitalRecord02Service{repo: repo}
}

// Create validates and persists a new HospitalRecord02.
func (s *HospitalRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord02, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord02{
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

// Get returns a HospitalRecord02 by id.
func (s *HospitalRecord02Service) Get(ctx context.Context, id string) (*models.HospitalRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord02 pages.
func (s *HospitalRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord02.
func (s *HospitalRecord02Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord02.
func (s *HospitalRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord02 by external code prefix.
func (s *HospitalRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
