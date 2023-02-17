package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord15Service encapsulates business rules for AuthRecord15.
type AuthRecord15Service struct {
	repo *repository.AuthRecord15Repository
}

// NewAuthRecord15Service wires the service.
func NewAuthRecord15Service(repo *repository.AuthRecord15Repository) *AuthRecord15Service {
	return &AuthRecord15Service{repo: repo}
}

// Create validates and persists a new AuthRecord15.
func (s *AuthRecord15Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord15, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord15{
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

// Get returns a AuthRecord15 by id.
func (s *AuthRecord15Service) Get(ctx context.Context, id string) (*models.AuthRecord15, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord15 pages.
func (s *AuthRecord15Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord15, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord15.
func (s *AuthRecord15Service) Update(ctx context.Context, actor string, rec *models.AuthRecord15) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord15.
func (s *AuthRecord15Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord15 by external code prefix.
func (s *AuthRecord15Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord15, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord15Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
