package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord28Service encapsulates business rules for AuthRecord28.
type AuthRecord28Service struct {
	repo *repository.AuthRecord28Repository
}

// NewAuthRecord28Service wires the service.
func NewAuthRecord28Service(repo *repository.AuthRecord28Repository) *AuthRecord28Service {
	return &AuthRecord28Service{repo: repo}
}

// Create validates and persists a new AuthRecord28.
func (s *AuthRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord28, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord28{
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

// Get returns a AuthRecord28 by id.
func (s *AuthRecord28Service) Get(ctx context.Context, id string) (*models.AuthRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord28 pages.
func (s *AuthRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord28.
func (s *AuthRecord28Service) Update(ctx context.Context, actor string, rec *models.AuthRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord28.
func (s *AuthRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord28 by external code prefix.
func (s *AuthRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
