package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord03Service encapsulates business rules for QualityControlRecord03.
type QualityControlRecord03Service struct {
	repo *repository.QualityControlRecord03Repository
}

// NewQualityControlRecord03Service wires the service.
func NewQualityControlRecord03Service(repo *repository.QualityControlRecord03Repository) *QualityControlRecord03Service {
	return &QualityControlRecord03Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord03.
func (s *QualityControlRecord03Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord03, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord03{
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

// Get returns a QualityControlRecord03 by id.
func (s *QualityControlRecord03Service) Get(ctx context.Context, id string) (*models.QualityControlRecord03, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord03 pages.
func (s *QualityControlRecord03Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord03, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord03.
func (s *QualityControlRecord03Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord03) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord03.
func (s *QualityControlRecord03Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord03 by external code prefix.
func (s *QualityControlRecord03Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord03, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord03Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
