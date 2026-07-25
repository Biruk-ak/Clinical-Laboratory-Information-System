package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord26Service encapsulates business rules for AuthRecord26.
type AuthRecord26Service struct {
	repo *repository.AuthRecord26Repository
}

// NewAuthRecord26Service wires the service.
func NewAuthRecord26Service(repo *repository.AuthRecord26Repository) *AuthRecord26Service {
	return &AuthRecord26Service{repo: repo}
}

// Create validates and persists a new AuthRecord26.
func (s *AuthRecord26Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord26, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord26{
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

// Get returns a AuthRecord26 by id.
func (s *AuthRecord26Service) Get(ctx context.Context, id string) (*models.AuthRecord26, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord26 pages.
func (s *AuthRecord26Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord26, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord26.
func (s *AuthRecord26Service) Update(ctx context.Context, actor string, rec *models.AuthRecord26) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord26.
func (s *AuthRecord26Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord26 by external code prefix.
func (s *AuthRecord26Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord26, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord26Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
