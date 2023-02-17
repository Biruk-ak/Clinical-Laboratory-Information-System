package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// AuthRecord04Service encapsulates business rules for AuthRecord04.
type AuthRecord04Service struct {
	repo *repository.AuthRecord04Repository
}

// NewAuthRecord04Service wires the service.
func NewAuthRecord04Service(repo *repository.AuthRecord04Repository) *AuthRecord04Service {
	return &AuthRecord04Service{repo: repo}
}

// Create validates and persists a new AuthRecord04.
func (s *AuthRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.AuthRecord04, error) {
	now := time.Now().UTC()
	rec := &models.AuthRecord04{
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

// Get returns a AuthRecord04 by id.
func (s *AuthRecord04Service) Get(ctx context.Context, id string) (*models.AuthRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped AuthRecord04 pages.
func (s *AuthRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.AuthRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing AuthRecord04.
func (s *AuthRecord04Service) Update(ctx context.Context, actor string, rec *models.AuthRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a AuthRecord04.
func (s *AuthRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds AuthRecord04 by external code prefix.
func (s *AuthRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.AuthRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *AuthRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
