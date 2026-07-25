package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord14Service encapsulates business rules for QualityControlRecord14.
type QualityControlRecord14Service struct {
	repo *repository.QualityControlRecord14Repository
}

// NewQualityControlRecord14Service wires the service.
func NewQualityControlRecord14Service(repo *repository.QualityControlRecord14Repository) *QualityControlRecord14Service {
	return &QualityControlRecord14Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord14.
func (s *QualityControlRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord14, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord14{
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

// Get returns a QualityControlRecord14 by id.
func (s *QualityControlRecord14Service) Get(ctx context.Context, id string) (*models.QualityControlRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord14 pages.
func (s *QualityControlRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord14.
func (s *QualityControlRecord14Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord14.
func (s *QualityControlRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord14 by external code prefix.
func (s *QualityControlRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
