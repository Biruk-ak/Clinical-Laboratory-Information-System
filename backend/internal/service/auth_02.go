package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord02Service encapsulates business rules for AuthRecord02.
type AuthRecord02Service struct {
	repo *repository.AuthRecord02Repository
}

// NewAuthRecord02Service wires the service.
func NewAuthRecord02Service(repo *repository.AuthRecord02Repository) *AuthRecord02Service {
	return &AuthRecord02Service{repo: repo}
}

// Create validates and persists a new AuthRecord02.
func (s *AuthRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord02, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord02{
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

// Get returns a AuthRecord02 by id.
func (s *AuthRecord02Service) Get(ctx context.Context, id string) (*models.AuthRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord02 pages.
func (s *AuthRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord02.
func (s *AuthRecord02Service) Update(ctx context.Context, actor string, rec *models.AuthRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord02.
func (s *AuthRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord02 by external code prefix.
func (s *AuthRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
