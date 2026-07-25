package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord19Service encapsulates business rules for HospitalRecord19.
type HospitalRecord19Service struct {
	repo *repository.HospitalRecord19Repository
}

// NewHospitalRecord19Service wires the service.
func NewHospitalRecord19Service(repo *repository.HospitalRecord19Repository) *HospitalRecord19Service {
	return &HospitalRecord19Service{repo: repo}
}

// Create validates and persists a new HospitalRecord19.
func (s *HospitalRecord19Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord19, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord19{
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

// Get returns a HospitalRecord19 by id.
func (s *HospitalRecord19Service) Get(ctx context.Context, id string) (*models.HospitalRecord19, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord19 pages.
func (s *HospitalRecord19Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord19, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord19.
func (s *HospitalRecord19Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord19) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord19.
func (s *HospitalRecord19Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord19 by external code prefix.
func (s *HospitalRecord19Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord19, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord19Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
