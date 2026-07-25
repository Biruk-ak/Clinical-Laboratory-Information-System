package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord10Service encapsulates business rules for AuthRecord10.
type AuthRecord10Service struct {
	repo *repository.AuthRecord10Repository
}

// NewAuthRecord10Service wires the service.
func NewAuthRecord10Service(repo *repository.AuthRecord10Repository) *AuthRecord10Service {
	return &AuthRecord10Service{repo: repo}
}

// Create validates and persists a new AuthRecord10.
func (s *AuthRecord10Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord10, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord10{
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

// Get returns a AuthRecord10 by id.
func (s *AuthRecord10Service) Get(ctx context.Context, id string) (*models.AuthRecord10, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord10 pages.
func (s *AuthRecord10Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord10, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord10.
func (s *AuthRecord10Service) Update(ctx context.Context, actor string, rec *models.AuthRecord10) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord10.
func (s *AuthRecord10Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord10 by external code prefix.
func (s *AuthRecord10Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord10, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord10Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
