package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord16Service encapsulates business rules for EquipmentRecord16.
type EquipmentRecord16Service struct {
	repo *repository.EquipmentRecord16Repository
}

// NewEquipmentRecord16Service wires the service.
func NewEquipmentRecord16Service(repo *repository.EquipmentRecord16Repository) *EquipmentRecord16Service {
	return &EquipmentRecord16Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord16.
func (s *EquipmentRecord16Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord16, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord16{
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

// Get returns a EquipmentRecord16 by id.
func (s *EquipmentRecord16Service) Get(ctx context.Context, id string) (*models.EquipmentRecord16, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord16 pages.
func (s *EquipmentRecord16Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord16, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord16.
func (s *EquipmentRecord16Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord16) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord16.
func (s *EquipmentRecord16Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord16 by external code prefix.
func (s *EquipmentRecord16Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord16, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord16Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
