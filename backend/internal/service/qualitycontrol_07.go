package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord07Service encapsulates business rules for QualityControlRecord07.
type QualityControlRecord07Service struct {
	repo *repository.QualityControlRecord07Repository
}

// NewQualityControlRecord07Service wires the service.
func NewQualityControlRecord07Service(repo *repository.QualityControlRecord07Repository) *QualityControlRecord07Service {
	return &QualityControlRecord07Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord07.
func (s *QualityControlRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord07, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord07{
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

// Get returns a QualityControlRecord07 by id.
func (s *QualityControlRecord07Service) Get(ctx context.Context, id string) (*models.QualityControlRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord07 pages.
func (s *QualityControlRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord07.
func (s *QualityControlRecord07Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord07.
func (s *QualityControlRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord07 by external code prefix.
func (s *QualityControlRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
