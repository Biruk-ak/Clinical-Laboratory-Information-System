package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord05Service encapsulates business rules for DoctorRecord05.
type DoctorRecord05Service struct {
	repo *repository.DoctorRecord05Repository
}

// NewDoctorRecord05Service wires the service.
func NewDoctorRecord05Service(repo *repository.DoctorRecord05Repository) *DoctorRecord05Service {
	return &DoctorRecord05Service{repo: repo}
}

// Create validates and persists a new DoctorRecord05.
func (s *DoctorRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord05, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord05{
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

// Get returns a DoctorRecord05 by id.
func (s *DoctorRecord05Service) Get(ctx context.Context, id string) (*models.DoctorRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord05 pages.
func (s *DoctorRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord05.
func (s *DoctorRecord05Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord05.
func (s *DoctorRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord05 by external code prefix.
func (s *DoctorRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
