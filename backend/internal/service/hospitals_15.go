package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord15Service encapsulates business rules for HospitalRecord15.
type HospitalRecord15Service struct {
	repo *repository.HospitalRecord15Repository
}

// NewHospitalRecord15Service wires the service.
func NewHospitalRecord15Service(repo *repository.HospitalRecord15Repository) *HospitalRecord15Service {
	return &HospitalRecord15Service{repo: repo}
}

// Create validates and persists a new HospitalRecord15.
func (s *HospitalRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord15, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord15{
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

// Get returns a HospitalRecord15 by id.
func (s *HospitalRecord15Service) Get(ctx context.Context, id string) (*models.HospitalRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord15 pages.
func (s *HospitalRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord15.
func (s *HospitalRecord15Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord15.
func (s *HospitalRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord15 by external code prefix.
func (s *HospitalRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
