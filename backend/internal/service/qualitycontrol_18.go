package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord18Service encapsulates business rules for QualityControlRecord18.
type QualityControlRecord18Service struct {
	repo *repository.QualityControlRecord18Repository
}

// NewQualityControlRecord18Service wires the service.
func NewQualityControlRecord18Service(repo *repository.QualityControlRecord18Repository) *QualityControlRecord18Service {
	return &QualityControlRecord18Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord18.
func (s *QualityControlRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord18, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord18{
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

// Get returns a QualityControlRecord18 by id.
func (s *QualityControlRecord18Service) Get(ctx context.Context, id string) (*models.QualityControlRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord18 pages.
func (s *QualityControlRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord18.
func (s *QualityControlRecord18Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord18.
func (s *QualityControlRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord18 by external code prefix.
func (s *QualityControlRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
