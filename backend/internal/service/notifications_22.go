package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord22Service encapsulates business rules for NotificationRecord22.
type NotificationRecord22Service struct {
	repo *repository.NotificationRecord22Repository
}

// NewNotificationRecord22Service wires the service.
func NewNotificationRecord22Service(repo *repository.NotificationRecord22Repository) *NotificationRecord22Service {
	return &NotificationRecord22Service{repo: repo}
}

// Create validates and persists a new NotificationRecord22.
func (s *NotificationRecord22Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord22, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord22{
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

// Get returns a NotificationRecord22 by id.
func (s *NotificationRecord22Service) Get(ctx context.Context, id string) (*models.NotificationRecord22, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord22 pages.
func (s *NotificationRecord22Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord22, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord22.
func (s *NotificationRecord22Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord22) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord22.
func (s *NotificationRecord22Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord22 by external code prefix.
func (s *NotificationRecord22Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord22, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord22Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
