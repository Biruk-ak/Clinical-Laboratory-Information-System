package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord22Service encapsulates business rules for ResultRecord22.
type ResultRecord22Service struct {
	repo *repository.ResultRecord22Repository
}

// NewResultRecord22Service wires the service.
func NewResultRecord22Service(repo *repository.ResultRecord22Repository) *ResultRecord22Service {
	return &ResultRecord22Service{repo: repo}
}

// Create validates and persists a new ResultRecord22.
func (s *ResultRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord22, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord22{
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

// Get returns a ResultRecord22 by id.
func (s *ResultRecord22Service) Get(ctx context.Context, id string) (*models.ResultRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord22 pages.
func (s *ResultRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord22.
func (s *ResultRecord22Service) Update(ctx context.Context, actor string, rec *models.ResultRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord22.
func (s *ResultRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord22 by external code prefix.
func (s *ResultRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
