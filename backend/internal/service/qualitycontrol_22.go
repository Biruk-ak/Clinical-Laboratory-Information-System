package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord22Service encapsulates business rules for QualityControlRecord22.
type QualityControlRecord22Service struct {
	repo *repository.QualityControlRecord22Repository
}

// NewQualityControlRecord22Service wires the service.
func NewQualityControlRecord22Service(repo *repository.QualityControlRecord22Repository) *QualityControlRecord22Service {
	return &QualityControlRecord22Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord22.
func (s *QualityControlRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord22, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord22{
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

// Get returns a QualityControlRecord22 by id.
func (s *QualityControlRecord22Service) Get(ctx context.Context, id string) (*models.QualityControlRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord22 pages.
func (s *QualityControlRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord22.
func (s *QualityControlRecord22Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord22.
func (s *QualityControlRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord22 by external code prefix.
func (s *QualityControlRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
