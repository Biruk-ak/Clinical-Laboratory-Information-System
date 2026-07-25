package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord05Service encapsulates business rules for EquipmentRecord05.
type EquipmentRecord05Service struct {
	repo *repository.EquipmentRecord05Repository
}

// NewEquipmentRecord05Service wires the service.
func NewEquipmentRecord05Service(repo *repository.EquipmentRecord05Repository) *EquipmentRecord05Service {
	return &EquipmentRecord05Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord05.
func (s *EquipmentRecord05Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord05, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord05{
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

// Get returns a EquipmentRecord05 by id.
func (s *EquipmentRecord05Service) Get(ctx context.Context, id string) (*models.EquipmentRecord05, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord05 pages.
func (s *EquipmentRecord05Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord05, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord05.
func (s *EquipmentRecord05Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord05) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord05.
func (s *EquipmentRecord05Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord05 by external code prefix.
func (s *EquipmentRecord05Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord05, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord05Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
