package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord14Service encapsulates business rules for EquipmentRecord14.
type EquipmentRecord14Service struct {
	repo *repository.EquipmentRecord14Repository
}

// NewEquipmentRecord14Service wires the service.
func NewEquipmentRecord14Service(repo *repository.EquipmentRecord14Repository) *EquipmentRecord14Service {
	return &EquipmentRecord14Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord14.
func (s *EquipmentRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord14, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord14{
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

// Get returns a EquipmentRecord14 by id.
func (s *EquipmentRecord14Service) Get(ctx context.Context, id string) (*models.EquipmentRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord14 pages.
func (s *EquipmentRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord14.
func (s *EquipmentRecord14Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord14.
func (s *EquipmentRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord14 by external code prefix.
func (s *EquipmentRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
