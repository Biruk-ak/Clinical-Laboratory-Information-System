package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord12Service encapsulates business rules for EquipmentRecord12.
type EquipmentRecord12Service struct {
	repo *repository.EquipmentRecord12Repository
}

// NewEquipmentRecord12Service wires the service.
func NewEquipmentRecord12Service(repo *repository.EquipmentRecord12Repository) *EquipmentRecord12Service {
	return &EquipmentRecord12Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord12.
func (s *EquipmentRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord12, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord12{
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

// Get returns a EquipmentRecord12 by id.
func (s *EquipmentRecord12Service) Get(ctx context.Context, id string) (*models.EquipmentRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord12 pages.
func (s *EquipmentRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord12.
func (s *EquipmentRecord12Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord12.
func (s *EquipmentRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord12 by external code prefix.
func (s *EquipmentRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
