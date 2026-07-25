package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord05Service encapsulates business rules for HospitalRecord05.
type HospitalRecord05Service struct {
	repo *repository.HospitalRecord05Repository
}

// NewHospitalRecord05Service wires the service.
func NewHospitalRecord05Service(repo *repository.HospitalRecord05Repository) *HospitalRecord05Service {
	return &HospitalRecord05Service{repo: repo}
}

// Create validates and persists a new HospitalRecord05.
func (s *HospitalRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord05, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord05{
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

// Get returns a HospitalRecord05 by id.
func (s *HospitalRecord05Service) Get(ctx context.Context, id string) (*models.HospitalRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord05 pages.
func (s *HospitalRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord05.
func (s *HospitalRecord05Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord05.
func (s *HospitalRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord05 by external code prefix.
func (s *HospitalRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
