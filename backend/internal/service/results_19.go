package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ResultRecord19Service encapsulates business rules for ResultRecord19.
type ResultRecord19Service struct {
	repo *repository.ResultRecord19Repository
}

// NewResultRecord19Service wires the service.
func NewResultRecord19Service(repo *repository.ResultRecord19Repository) *ResultRecord19Service {
	return &ResultRecord19Service{repo: repo}
}

// Create validates and persists a new ResultRecord19.
func (s *ResultRecord19Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ResultRecord19, error) {
	now := time.Now().UTC()
	rec := &models.ResultRecord19{
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

// Get returns a ResultRecord19 by id.
func (s *ResultRecord19Service) Get(ctx context.Context, id string) (*models.ResultRecord19, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ResultRecord19 pages.
func (s *ResultRecord19Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ResultRecord19, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ResultRecord19.
func (s *ResultRecord19Service) Update(ctx context.Context, actor string, rec *models.ResultRecord19) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ResultRecord19.
func (s *ResultRecord19Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ResultRecord19 by external code prefix.
func (s *ResultRecord19Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ResultRecord19, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ResultRecord19Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
