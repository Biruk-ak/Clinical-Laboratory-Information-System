package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord07Service encapsulates business rules for AuthRecord07.
type AuthRecord07Service struct {
	repo *repository.AuthRecord07Repository
}

// NewAuthRecord07Service wires the service.
func NewAuthRecord07Service(repo *repository.AuthRecord07Repository) *AuthRecord07Service {
	return &AuthRecord07Service{repo: repo}
}

// Create validates and persists a new AuthRecord07.
func (s *AuthRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord07, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord07{
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

// Get returns a AuthRecord07 by id.
func (s *AuthRecord07Service) Get(ctx context.Context, id string) (*models.AuthRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord07 pages.
func (s *AuthRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord07.
func (s *AuthRecord07Service) Update(ctx context.Context, actor string, rec *models.AuthRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord07.
func (s *AuthRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord07 by external code prefix.
func (s *AuthRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
