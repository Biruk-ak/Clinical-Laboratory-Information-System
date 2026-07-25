package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord25Service encapsulates business rules for QualityControlRecord25.
type QualityControlRecord25Service struct {
	repo *repository.QualityControlRecord25Repository
}

// NewQualityControlRecord25Service wires the service.
func NewQualityControlRecord25Service(repo *repository.QualityControlRecord25Repository) *QualityControlRecord25Service {
	return &QualityControlRecord25Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord25.
func (s *QualityControlRecord25Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord25, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord25{
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

// Get returns a QualityControlRecord25 by id.
func (s *QualityControlRecord25Service) Get(ctx context.Context, id string) (*models.QualityControlRecord25, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord25 pages.
func (s *QualityControlRecord25Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord25, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord25.
func (s *QualityControlRecord25Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord25) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord25.
func (s *QualityControlRecord25Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord25 by external code prefix.
func (s *QualityControlRecord25Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord25, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord25Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
