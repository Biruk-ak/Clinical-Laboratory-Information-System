package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord03Service encapsulates business rules for AuthRecord03.
type AuthRecord03Service struct {
	repo *repository.AuthRecord03Repository
}

// NewAuthRecord03Service wires the service.
func NewAuthRecord03Service(repo *repository.AuthRecord03Repository) *AuthRecord03Service {
	return &AuthRecord03Service{repo: repo}
}

// Create validates and persists a new AuthRecord03.
func (s *AuthRecord03Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord03, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord03{
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

// Get returns a AuthRecord03 by id.
func (s *AuthRecord03Service) Get(ctx context.Context, id string) (*models.AuthRecord03, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord03 pages.
func (s *AuthRecord03Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord03, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord03.
func (s *AuthRecord03Service) Update(ctx context.Context, actor string, rec *models.AuthRecord03) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord03.
func (s *AuthRecord03Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord03 by external code prefix.
func (s *AuthRecord03Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord03, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord03Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
