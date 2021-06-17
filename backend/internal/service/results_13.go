package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord13Service encapsulates business rules for ResultRecord13.
type ResultRecord13Service struct {
	repo *repository.ResultRecord13Repository
}

// NewResultRecord13Service wires the service.
func NewResultRecord13Service(repo *repository.ResultRecord13Repository) *ResultRecord13Service {
	return &ResultRecord13Service{repo: repo}
}

// Create validates and persists a new ResultRecord13.
func (s *ResultRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord13, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord13{
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

// Get returns a ResultRecord13 by id.
func (s *ResultRecord13Service) Get(ctx context.Context, id string) (*models.ResultRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord13 pages.
func (s *ResultRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord13.
func (s *ResultRecord13Service) Update(ctx context.Context, actor string, rec *models.ResultRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord13.
func (s *ResultRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord13 by external code prefix.
func (s *ResultRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
