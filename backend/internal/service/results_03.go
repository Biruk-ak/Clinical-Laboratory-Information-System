package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord03Service encapsulates business rules for ResultRecord03.
type ResultRecord03Service struct {
	repo *repository.ResultRecord03Repository
}

// NewResultRecord03Service wires the service.
func NewResultRecord03Service(repo *repository.ResultRecord03Repository) *ResultRecord03Service {
	return &ResultRecord03Service{repo: repo}
}

// Create validates and persists a new ResultRecord03.
func (s *ResultRecord03Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord03, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord03{
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

// Get returns a ResultRecord03 by id.
func (s *ResultRecord03Service) Get(ctx context.Context, id string) (*models.ResultRecord03, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord03 pages.
func (s *ResultRecord03Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord03, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord03.
func (s *ResultRecord03Service) Update(ctx context.Context, actor string, rec *models.ResultRecord03) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord03.
func (s *ResultRecord03Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord03 by external code prefix.
func (s *ResultRecord03Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord03, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord03Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
