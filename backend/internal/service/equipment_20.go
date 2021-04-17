package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// EquipmentRecord20Service encapsulates business rules for EquipmentRecord20.
type EquipmentRecord20Service struct {
	repo *repository.EquipmentRecord20Repository
}

// NewEquipmentRecord20Service wires the service.
func NewEquipmentRecord20Service(repo *repository.EquipmentRecord20Repository) *EquipmentRecord20Service {
	return &EquipmentRecord20Service{repo: repo}
}

// Create validates and persists a new EquipmentRecord20.
func (s *EquipmentRecord20Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.EquipmentRecord20, error) {
	now := time.Now().UTC()
	rec := &models.EquipmentRecord20{
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

// Get returns a EquipmentRecord20 by id.
func (s *EquipmentRecord20Service) Get(ctx context.Context, id string) (*models.EquipmentRecord20, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped EquipmentRecord20 pages.
func (s *EquipmentRecord20Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.EquipmentRecord20, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing EquipmentRecord20.
func (s *EquipmentRecord20Service) Update(ctx context.Context, actor string, rec *models.EquipmentRecord20) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a EquipmentRecord20.
func (s *EquipmentRecord20Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds EquipmentRecord20 by external code prefix.
func (s *EquipmentRecord20Service) Search(ctx context.Context, facilityID, prefix string) ([]models.EquipmentRecord20, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *EquipmentRecord20Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
