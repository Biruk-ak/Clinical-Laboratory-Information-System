package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord23Service encapsulates business rules for ResultRecord23.
type ResultRecord23Service struct {
	repo *repository.ResultRecord23Repository
}

// NewResultRecord23Service wires the service.
func NewResultRecord23Service(repo *repository.ResultRecord23Repository) *ResultRecord23Service {
	return &ResultRecord23Service{repo: repo}
}

// Create validates and persists a new ResultRecord23.
func (s *ResultRecord23Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord23, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord23{
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

// Get returns a ResultRecord23 by id.
func (s *ResultRecord23Service) Get(ctx context.Context, id string) (*models.ResultRecord23, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord23 pages.
func (s *ResultRecord23Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord23, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord23.
func (s *ResultRecord23Service) Update(ctx context.Context, actor string, rec *models.ResultRecord23) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord23.
func (s *ResultRecord23Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord23 by external code prefix.
func (s *ResultRecord23Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord23, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord23Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
