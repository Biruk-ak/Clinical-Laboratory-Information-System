package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord27Service encapsulates business rules for NotificationRecord27.
type NotificationRecord27Service struct {
	repo *repository.NotificationRecord27Repository
}

// NewNotificationRecord27Service wires the service.
func NewNotificationRecord27Service(repo *repository.NotificationRecord27Repository) *NotificationRecord27Service {
	return &NotificationRecord27Service{repo: repo}
}

// Create validates and persists a new NotificationRecord27.
func (s *NotificationRecord27Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord27, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord27{
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

// Get returns a NotificationRecord27 by id.
func (s *NotificationRecord27Service) Get(ctx context.Context, id string) (*models.NotificationRecord27, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord27 pages.
func (s *NotificationRecord27Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord27, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord27.
func (s *NotificationRecord27Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord27) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord27.
func (s *NotificationRecord27Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord27 by external code prefix.
func (s *NotificationRecord27Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord27, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord27Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
