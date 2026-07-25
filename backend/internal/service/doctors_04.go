package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// DoctorRecord04Service encapsulates business rules for DoctorRecord04.
type DoctorRecord04Service struct {
	repo *repository.DoctorRecord04Repository
}

// NewDoctorRecord04Service wires the service.
func NewDoctorRecord04Service(repo *repository.DoctorRecord04Repository) *DoctorRecord04Service {
	return &DoctorRecord04Service{repo: repo}
}

// Create validates and persists a new DoctorRecord04.
func (s *DoctorRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.DoctorRecord04, error) {
	now := time.Now().UTC()
	rec := &models.DoctorRecord04{
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

// Get returns a DoctorRecord04 by id.
func (s *DoctorRecord04Service) Get(ctx context.Context, id string) (*models.DoctorRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped DoctorRecord04 pages.
func (s *DoctorRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.DoctorRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing DoctorRecord04.
func (s *DoctorRecord04Service) Update(ctx context.Context, actor string, rec *models.DoctorRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a DoctorRecord04.
func (s *DoctorRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds DoctorRecord04 by external code prefix.
func (s *DoctorRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.DoctorRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *DoctorRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
