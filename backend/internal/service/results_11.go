package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord11Service encapsulates business rules for ResultRecord11.
type ResultRecord11Service struct {
	repo *repository.ResultRecord11Repository
}

// NewResultRecord11Service wires the service.
func NewResultRecord11Service(repo *repository.ResultRecord11Repository) *ResultRecord11Service {
	return &ResultRecord11Service{repo: repo}
}

// Create validates and persists a new ResultRecord11.
func (s *ResultRecord11Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord11, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord11{
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

// Get returns a ResultRecord11 by id.
func (s *ResultRecord11Service) Get(ctx context.Context, id string) (*models.ResultRecord11, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord11 pages.
func (s *ResultRecord11Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord11, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord11.
func (s *ResultRecord11Service) Update(ctx context.Context, actor string, rec *models.ResultRecord11) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord11.
func (s *ResultRecord11Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord11 by external code prefix.
func (s *ResultRecord11Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord11, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord11Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
