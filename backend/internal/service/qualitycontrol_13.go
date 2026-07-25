package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord13Service encapsulates business rules for QualityControlRecord13.
type QualityControlRecord13Service struct {
	repo *repository.QualityControlRecord13Repository
}

// NewQualityControlRecord13Service wires the service.
func NewQualityControlRecord13Service(repo *repository.QualityControlRecord13Repository) *QualityControlRecord13Service {
	return &QualityControlRecord13Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord13.
func (s *QualityControlRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord13, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord13{
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

// Get returns a QualityControlRecord13 by id.
func (s *QualityControlRecord13Service) Get(ctx context.Context, id string) (*models.QualityControlRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord13 pages.
func (s *QualityControlRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord13.
func (s *QualityControlRecord13Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord13.
func (s *QualityControlRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord13 by external code prefix.
func (s *QualityControlRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
