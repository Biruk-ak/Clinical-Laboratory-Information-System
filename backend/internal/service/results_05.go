package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord05Service encapsulates business rules for ResultRecord05.
type ResultRecord05Service struct {
	repo *repository.ResultRecord05Repository
}

// NewResultRecord05Service wires the service.
func NewResultRecord05Service(repo *repository.ResultRecord05Repository) *ResultRecord05Service {
	return &ResultRecord05Service{repo: repo}
}

// Create validates and persists a new ResultRecord05.
func (s *ResultRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord05, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord05{
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

// Get returns a ResultRecord05 by id.
func (s *ResultRecord05Service) Get(ctx context.Context, id string) (*models.ResultRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord05 pages.
func (s *ResultRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord05.
func (s *ResultRecord05Service) Update(ctx context.Context, actor string, rec *models.ResultRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord05.
func (s *ResultRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord05 by external code prefix.
func (s *ResultRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
