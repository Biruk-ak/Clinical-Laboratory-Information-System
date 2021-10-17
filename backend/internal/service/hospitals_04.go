package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// HospitalRecord04Service encapsulates business rules for HospitalRecord04.
type HospitalRecord04Service struct {
	repo *repository.HospitalRecord04Repository
}

// NewHospitalRecord04Service wires the service.
func NewHospitalRecord04Service(repo *repository.HospitalRecord04Repository) *HospitalRecord04Service {
	return &HospitalRecord04Service{repo: repo}
}

// Create validates and persists a new HospitalRecord04.
func (s *HospitalRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.HospitalRecord04, error) {
	now := time.Now().UTC()
	rec := &models.HospitalRecord04{
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

// Get returns a HospitalRecord04 by id.
func (s *HospitalRecord04Service) Get(ctx context.Context, id string) (*models.HospitalRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped HospitalRecord04 pages.
func (s *HospitalRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.HospitalRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing HospitalRecord04.
func (s *HospitalRecord04Service) Update(ctx context.Context, actor string, rec *models.HospitalRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a HospitalRecord04.
func (s *HospitalRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds HospitalRecord04 by external code prefix.
func (s *HospitalRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.HospitalRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *HospitalRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
