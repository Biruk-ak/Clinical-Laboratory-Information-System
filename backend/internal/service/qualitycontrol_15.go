package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord15Service encapsulates business rules for QualityControlRecord15.
type QualityControlRecord15Service struct {
	repo *repository.QualityControlRecord15Repository
}

// NewQualityControlRecord15Service wires the service.
func NewQualityControlRecord15Service(repo *repository.QualityControlRecord15Repository) *QualityControlRecord15Service {
	return &QualityControlRecord15Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord15.
func (s *QualityControlRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord15, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord15{
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

// Get returns a QualityControlRecord15 by id.
func (s *QualityControlRecord15Service) Get(ctx context.Context, id string) (*models.QualityControlRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord15 pages.
func (s *QualityControlRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord15.
func (s *QualityControlRecord15Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord15.
func (s *QualityControlRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord15 by external code prefix.
func (s *QualityControlRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
