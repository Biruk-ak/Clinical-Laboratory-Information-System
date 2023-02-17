package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord27Service encapsulates business rules for AuthRecord27.
type AuthRecord27Service struct {
	repo *repository.AuthRecord27Repository
}

// NewAuthRecord27Service wires the service.
func NewAuthRecord27Service(repo *repository.AuthRecord27Repository) *AuthRecord27Service {
	return &AuthRecord27Service{repo: repo}
}

// Create validates and persists a new AuthRecord27.
func (s *AuthRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord27, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord27{
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

// Get returns a AuthRecord27 by id.
func (s *AuthRecord27Service) Get(ctx context.Context, id string) (*models.AuthRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord27 pages.
func (s *AuthRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord27.
func (s *AuthRecord27Service) Update(ctx context.Context, actor string, rec *models.AuthRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord27.
func (s *AuthRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord27 by external code prefix.
func (s *AuthRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
