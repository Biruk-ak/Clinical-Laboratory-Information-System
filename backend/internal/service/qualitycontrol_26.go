package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// QualityControlRecord26Service encapsulates business rules for QualityControlRecord26.
type QualityControlRecord26Service struct {
	repo *repository.QualityControlRecord26Repository
}

// NewQualityControlRecord26Service wires the service.
func NewQualityControlRecord26Service(repo *repository.QualityControlRecord26Repository) *QualityControlRecord26Service {
	return &QualityControlRecord26Service{repo: repo}
}

// Create validates and persists a new QualityControlRecord26.
func (s *QualityControlRecord26Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.QualityControlRecord26, error) {
	now := time.Now().UTC()
	rec := &models.QualityControlRecord26{
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

// Get returns a QualityControlRecord26 by id.
func (s *QualityControlRecord26Service) Get(ctx context.Context, id string) (*models.QualityControlRecord26, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped QualityControlRecord26 pages.
func (s *QualityControlRecord26Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.QualityControlRecord26, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing QualityControlRecord26.
func (s *QualityControlRecord26Service) Update(ctx context.Context, actor string, rec *models.QualityControlRecord26) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a QualityControlRecord26.
func (s *QualityControlRecord26Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds QualityControlRecord26 by external code prefix.
func (s *QualityControlRecord26Service) Search(ctx context.Context, facilityID, prefix string) ([]models.QualityControlRecord26, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *QualityControlRecord26Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
