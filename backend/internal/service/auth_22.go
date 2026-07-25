package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord22Service encapsulates business rules for AuthRecord22.
type AuthRecord22Service struct {
	repo *repository.AuthRecord22Repository
}

// NewAuthRecord22Service wires the service.
func NewAuthRecord22Service(repo *repository.AuthRecord22Repository) *AuthRecord22Service {
	return &AuthRecord22Service{repo: repo}
}

// Create validates and persists a new AuthRecord22.
func (s *AuthRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord22, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord22{
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

// Get returns a AuthRecord22 by id.
func (s *AuthRecord22Service) Get(ctx context.Context, id string) (*models.AuthRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord22 pages.
func (s *AuthRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord22.
func (s *AuthRecord22Service) Update(ctx context.Context, actor string, rec *models.AuthRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord22.
func (s *AuthRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord22 by external code prefix.
func (s *AuthRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
