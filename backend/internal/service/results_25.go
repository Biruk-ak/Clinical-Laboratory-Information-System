package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord25Service encapsulates business rules for ResultRecord25.
type ResultRecord25Service struct {
	repo *repository.ResultRecord25Repository
}

// NewResultRecord25Service wires the service.
func NewResultRecord25Service(repo *repository.ResultRecord25Repository) *ResultRecord25Service {
	return &ResultRecord25Service{repo: repo}
}

// Create validates and persists a new ResultRecord25.
func (s *ResultRecord25Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord25, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord25{
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

// Get returns a ResultRecord25 by id.
func (s *ResultRecord25Service) Get(ctx context.Context, id string) (*models.ResultRecord25, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord25 pages.
func (s *ResultRecord25Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord25, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord25.
func (s *ResultRecord25Service) Update(ctx context.Context, actor string, rec *models.ResultRecord25) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord25.
func (s *ResultRecord25Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord25 by external code prefix.
func (s *ResultRecord25Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord25, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord25Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
