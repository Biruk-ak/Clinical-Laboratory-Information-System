package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord28Service encapsulates business rules for EquipmentRecord28.
type EquipmentRecord28Service struct {
	repo *repository.EquipmentRecord28Repository
}

// NewEquipmentRecord28Service wires the service.
func NewEquipmentRecord28Service(repo *repository.EquipmentRecord28Repository) *EquipmentRecord28Service {
	return &EquipmentRecord28Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord28.
func (s *EquipmentRecord28Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord28, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord28{
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

// Get returns a EquipmentRecord28 by id.
func (s *EquipmentRecord28Service) Get(ctx context.Context, id string) (*models.EquipmentRecord28, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord28 pages.
func (s *EquipmentRecord28Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord28, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord28.
func (s *EquipmentRecord28Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord28) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord28.
func (s *EquipmentRecord28Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord28 by external code prefix.
func (s *EquipmentRecord28Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord28, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord28Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
