package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord09Service encapsulates business rules for HospitalRecord09.
type HospitalRecord09Service struct {
	repo *repository.HospitalRecord09Repository
}

// NewHospitalRecord09Service wires the service.
func NewHospitalRecord09Service(repo *repository.HospitalRecord09Repository) *HospitalRecord09Service {
	return &HospitalRecord09Service{repo: repo}
}

// Create validates and persists a new HospitalRecord09.
func (s *HospitalRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord09, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord09{
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

// Get returns a HospitalRecord09 by id.
func (s *HospitalRecord09Service) Get(ctx context.Context, id string) (*models.HospitalRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord09 pages.
func (s *HospitalRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord09.
func (s *HospitalRecord09Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord09.
func (s *HospitalRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord09 by external code prefix.
func (s *HospitalRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
