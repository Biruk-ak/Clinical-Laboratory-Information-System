package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord13Service encapsulates business rules for NotificationRecord13.
type NotificationRecord13Service struct {
	repo *repository.NotificationRecord13Repository
}

// NewNotificationRecord13Service wires the service.
func NewNotificationRecord13Service(repo *repository.NotificationRecord13Repository) *NotificationRecord13Service {
	return &NotificationRecord13Service{repo: repo}
}

// Create validates and persists a new NotificationRecord13.
func (s *NotificationRecord13Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord13, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord13{
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

// Get returns a NotificationRecord13 by id.
func (s *NotificationRecord13Service) Get(ctx context.Context, id string) (*models.NotificationRecord13, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord13 pages.
func (s *NotificationRecord13Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord13, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord13.
func (s *NotificationRecord13Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord13) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord13.
func (s *NotificationRecord13Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord13 by external code prefix.
func (s *NotificationRecord13Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord13, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord13Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
