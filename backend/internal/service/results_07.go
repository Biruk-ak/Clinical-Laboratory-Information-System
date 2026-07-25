package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord07Service encapsulates business rules for ResultRecord07.
type ResultRecord07Service struct {
	repo *repository.ResultRecord07Repository
}

// NewResultRecord07Service wires the service.
func NewResultRecord07Service(repo *repository.ResultRecord07Repository) *ResultRecord07Service {
	return &ResultRecord07Service{repo: repo}
}

// Create validates and persists a new ResultRecord07.
func (s *ResultRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord07, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord07{
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

// Get returns a ResultRecord07 by id.
func (s *ResultRecord07Service) Get(ctx context.Context, id string) (*models.ResultRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord07 pages.
func (s *ResultRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord07.
func (s *ResultRecord07Service) Update(ctx context.Context, actor string, rec *models.ResultRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord07.
func (s *ResultRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord07 by external code prefix.
func (s *ResultRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
