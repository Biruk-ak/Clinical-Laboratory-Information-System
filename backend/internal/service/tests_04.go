package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// LabTestRecord04Service encapsulates business rules for LabTestRecord04.
type LabTestRecord04Service struct {
	repo *repository.LabTestRecord04Repository
}

// NewLabTestRecord04Service wires the service.
func NewLabTestRecord04Service(repo *repository.LabTestRecord04Repository) *LabTestRecord04Service {
	return &LabTestRecord04Service{repo: repo}
}

// Create validates and persists a new LabTestRecord04.
func (s *LabTestRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.LabTestRecord04, error) {
	now := time.Now().UTC()
	rec := &models.LabTestRecord04{
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

// Get returns a LabTestRecord04 by id.
func (s *LabTestRecord04Service) Get(ctx context.Context, id string) (*models.LabTestRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped LabTestRecord04 pages.
func (s *LabTestRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.LabTestRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing LabTestRecord04.
func (s *LabTestRecord04Service) Update(ctx context.Context, actor string, rec *models.LabTestRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a LabTestRecord04.
func (s *LabTestRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds LabTestRecord04 by external code prefix.
func (s *LabTestRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.LabTestRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *LabTestRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
