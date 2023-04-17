package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord24Service encapsulates business rules for NotificationRecord24.
type NotificationRecord24Service struct {
	repo *repository.NotificationRecord24Repository
}

// NewNotificationRecord24Service wires the service.
func NewNotificationRecord24Service(repo *repository.NotificationRecord24Repository) *NotificationRecord24Service {
	return &NotificationRecord24Service{repo: repo}
}

// Create validates and persists a new NotificationRecord24.
func (s *NotificationRecord24Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord24, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord24{
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

// Get returns a NotificationRecord24 by id.
func (s *NotificationRecord24Service) Get(ctx context.Context, id string) (*models.NotificationRecord24, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord24 pages.
func (s *NotificationRecord24Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord24, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord24.
func (s *NotificationRecord24Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord24) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord24.
func (s *NotificationRecord24Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord24 by external code prefix.
func (s *NotificationRecord24Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord24, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord24Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
