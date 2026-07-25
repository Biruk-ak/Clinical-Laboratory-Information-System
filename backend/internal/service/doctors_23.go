package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord23Service encapsulates business rules for DoctorRecord23.
type DoctorRecord23Service struct {
	repo *repository.DoctorRecord23Repository
}

// NewDoctorRecord23Service wires the service.
func NewDoctorRecord23Service(repo *repository.DoctorRecord23Repository) *DoctorRecord23Service {
	return &DoctorRecord23Service{repo: repo}
}

// Create validates and persists a new DoctorRecord23.
func (s *DoctorRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord23, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord23{
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

// Get returns a DoctorRecord23 by id.
func (s *DoctorRecord23Service) Get(ctx context.Context, id string) (*models.DoctorRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord23 pages.
func (s *DoctorRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord23.
func (s *DoctorRecord23Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord23.
func (s *DoctorRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord23 by external code prefix.
func (s *DoctorRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
