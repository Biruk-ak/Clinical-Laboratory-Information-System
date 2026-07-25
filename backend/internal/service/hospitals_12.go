package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord12Service encapsulates business rules for HospitalRecord12.
type HospitalRecord12Service struct {
	repo *repository.HospitalRecord12Repository
}

// NewHospitalRecord12Service wires the service.
func NewHospitalRecord12Service(repo *repository.HospitalRecord12Repository) *HospitalRecord12Service {
	return &HospitalRecord12Service{repo: repo}
}

// Create validates and persists a new HospitalRecord12.
func (s *HospitalRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord12, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord12{
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

// Get returns a HospitalRecord12 by id.
func (s *HospitalRecord12Service) Get(ctx context.Context, id string) (*models.HospitalRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord12 pages.
func (s *HospitalRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord12.
func (s *HospitalRecord12Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord12.
func (s *HospitalRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord12 by external code prefix.
func (s *HospitalRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
