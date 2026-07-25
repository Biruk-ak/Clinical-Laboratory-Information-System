package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord01Service encapsulates business rules for HospitalRecord01.
type HospitalRecord01Service struct {
	repo *repository.HospitalRecord01Repository
}

// NewHospitalRecord01Service wires the service.
func NewHospitalRecord01Service(repo *repository.HospitalRecord01Repository) *HospitalRecord01Service {
	return &HospitalRecord01Service{repo: repo}
}

// Create validates and persists a new HospitalRecord01.
func (s *HospitalRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord01, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord01{
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

// Get returns a HospitalRecord01 by id.
func (s *HospitalRecord01Service) Get(ctx context.Context, id string) (*models.HospitalRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord01 pages.
func (s *HospitalRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord01.
func (s *HospitalRecord01Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord01.
func (s *HospitalRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord01 by external code prefix.
func (s *HospitalRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
