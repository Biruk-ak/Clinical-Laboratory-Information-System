package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord16Service encapsulates business rules for ResultRecord16.
type ResultRecord16Service struct {
	repo *repository.ResultRecord16Repository
}

// NewResultRecord16Service wires the service.
func NewResultRecord16Service(repo *repository.ResultRecord16Repository) *ResultRecord16Service {
	return &ResultRecord16Service{repo: repo}
}

// Create validates and persists a new ResultRecord16.
func (s *ResultRecord16Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord16, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord16{
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

// Get returns a ResultRecord16 by id.
func (s *ResultRecord16Service) Get(ctx context.Context, id string) (*models.ResultRecord16, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord16 pages.
func (s *ResultRecord16Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord16, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord16.
func (s *ResultRecord16Service) Update(ctx context.Context, actor string, rec *models.ResultRecord16) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord16.
func (s *ResultRecord16Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord16 by external code prefix.
func (s *ResultRecord16Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord16, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord16Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
