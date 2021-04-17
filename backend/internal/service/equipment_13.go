package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord13Service encapsulates business rules for EquipmentRecord13.
type EquipmentRecord13Service struct {
	repo *repository.EquipmentRecord13Repository
}

// NewEquipmentRecord13Service wires the service.
func NewEquipmentRecord13Service(repo *repository.EquipmentRecord13Repository) *EquipmentRecord13Service {
	return &EquipmentRecord13Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord13.
func (s *EquipmentRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord13, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord13{
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

// Get returns a EquipmentRecord13 by id.
func (s *EquipmentRecord13Service) Get(ctx context.Context, id string) (*models.EquipmentRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord13 pages.
func (s *EquipmentRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord13.
func (s *EquipmentRecord13Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord13.
func (s *EquipmentRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord13 by external code prefix.
func (s *EquipmentRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
