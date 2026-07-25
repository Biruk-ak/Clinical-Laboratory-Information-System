package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord19Service encapsulates business rules for AuthRecord19.
type AuthRecord19Service struct {
	repo *repository.AuthRecord19Repository
}

// NewAuthRecord19Service wires the service.
func NewAuthRecord19Service(repo *repository.AuthRecord19Repository) *AuthRecord19Service {
	return &AuthRecord19Service{repo: repo}
}

// Create validates and persists a new AuthRecord19.
func (s *AuthRecord19Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord19, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord19{
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

// Get returns a AuthRecord19 by id.
func (s *AuthRecord19Service) Get(ctx context.Context, id string) (*models.AuthRecord19, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord19 pages.
func (s *AuthRecord19Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord19, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord19.
func (s *AuthRecord19Service) Update(ctx context.Context, actor string, rec *models.AuthRecord19) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord19.
func (s *AuthRecord19Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord19 by external code prefix.
func (s *AuthRecord19Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord19, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord19Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
