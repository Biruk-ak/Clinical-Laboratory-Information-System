package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord04Service encapsulates business rules for QualityControlRecord04.
type QualityControlRecord04Service struct {
	repo *repository.QualityControlRecord04Repository
}

// NewQualityControlRecord04Service wires the service.
func NewQualityControlRecord04Service(repo *repository.QualityControlRecord04Repository) *QualityControlRecord04Service {
	return &QualityControlRecord04Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord04.
func (s *QualityControlRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord04, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord04{
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

// Get returns a QualityControlRecord04 by id.
func (s *QualityControlRecord04Service) Get(ctx context.Context, id string) (*models.QualityControlRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord04 pages.
func (s *QualityControlRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord04.
func (s *QualityControlRecord04Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord04.
func (s *QualityControlRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord04 by external code prefix.
func (s *QualityControlRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
