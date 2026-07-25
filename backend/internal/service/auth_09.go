package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord09Service encapsulates business rules for AuthRecord09.
type AuthRecord09Service struct {
	repo *repository.AuthRecord09Repository
}

// NewAuthRecord09Service wires the service.
func NewAuthRecord09Service(repo *repository.AuthRecord09Repository) *AuthRecord09Service {
	return &AuthRecord09Service{repo: repo}
}

// Create validates and persists a new AuthRecord09.
func (s *AuthRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord09, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord09{
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

// Get returns a AuthRecord09 by id.
func (s *AuthRecord09Service) Get(ctx context.Context, id string) (*models.AuthRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord09 pages.
func (s *AuthRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord09.
func (s *AuthRecord09Service) Update(ctx context.Context, actor string, rec *models.AuthRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord09.
func (s *AuthRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord09 by external code prefix.
func (s *AuthRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
