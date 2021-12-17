package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord28Service encapsulates business rules for QualityControlRecord28.
type QualityControlRecord28Service struct {
	repo *repository.QualityControlRecord28Repository
}

// NewQualityControlRecord28Service wires the service.
func NewQualityControlRecord28Service(repo *repository.QualityControlRecord28Repository) *QualityControlRecord28Service {
	return &QualityControlRecord28Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord28.
func (s *QualityControlRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord28, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord28{
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

// Get returns a QualityControlRecord28 by id.
func (s *QualityControlRecord28Service) Get(ctx context.Context, id string) (*models.QualityControlRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord28 pages.
func (s *QualityControlRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord28.
func (s *QualityControlRecord28Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord28.
func (s *QualityControlRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord28 by external code prefix.
func (s *QualityControlRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
