package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord06Service encapsulates business rules for EquipmentRecord06.
type EquipmentRecord06Service struct {
	repo *repository.EquipmentRecord06Repository
}

// NewEquipmentRecord06Service wires the service.
func NewEquipmentRecord06Service(repo *repository.EquipmentRecord06Repository) *EquipmentRecord06Service {
	return &EquipmentRecord06Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord06.
func (s *EquipmentRecord06Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord06, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord06{
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

// Get returns a EquipmentRecord06 by id.
func (s *EquipmentRecord06Service) Get(ctx context.Context, id string) (*models.EquipmentRecord06, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord06 pages.
func (s *EquipmentRecord06Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord06, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord06.
func (s *EquipmentRecord06Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord06) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord06.
func (s *EquipmentRecord06Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord06 by external code prefix.
func (s *EquipmentRecord06Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord06, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord06Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
