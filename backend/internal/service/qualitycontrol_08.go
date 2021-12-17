package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord08Service encapsulates business rules for QualityControlRecord08.
type QualityControlRecord08Service struct {
	repo *repository.QualityControlRecord08Repository
}

// NewQualityControlRecord08Service wires the service.
func NewQualityControlRecord08Service(repo *repository.QualityControlRecord08Repository) *QualityControlRecord08Service {
	return &QualityControlRecord08Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord08.
func (s *QualityControlRecord08Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord08, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord08{
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

// Get returns a QualityControlRecord08 by id.
func (s *QualityControlRecord08Service) Get(ctx context.Context, id string) (*models.QualityControlRecord08, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord08 pages.
func (s *QualityControlRecord08Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord08, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord08.
func (s *QualityControlRecord08Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord08) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord08.
func (s *QualityControlRecord08Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord08 by external code prefix.
func (s *QualityControlRecord08Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord08, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord08Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
