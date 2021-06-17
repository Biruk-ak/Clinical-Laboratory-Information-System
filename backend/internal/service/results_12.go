package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord12Service encapsulates business rules for ResultRecord12.
type ResultRecord12Service struct {
	repo *repository.ResultRecord12Repository
}

// NewResultRecord12Service wires the service.
func NewResultRecord12Service(repo *repository.ResultRecord12Repository) *ResultRecord12Service {
	return &ResultRecord12Service{repo: repo}
}

// Create validates and persists a new ResultRecord12.
func (s *ResultRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord12, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord12{
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

// Get returns a ResultRecord12 by id.
func (s *ResultRecord12Service) Get(ctx context.Context, id string) (*models.ResultRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord12 pages.
func (s *ResultRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord12.
func (s *ResultRecord12Service) Update(ctx context.Context, actor string, rec *models.ResultRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord12.
func (s *ResultRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord12 by external code prefix.
func (s *ResultRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
