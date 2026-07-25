package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord18Service encapsulates business rules for NotificationRecord18.
type NotificationRecord18Service struct {
	repo *repository.NotificationRecord18Repository
}

// NewNotificationRecord18Service wires the service.
func NewNotificationRecord18Service(repo *repository.NotificationRecord18Repository) *NotificationRecord18Service {
	return &NotificationRecord18Service{repo: repo}
}

// Create validates and persists a new NotificationRecord18.
func (s *NotificationRecord18Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord18, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord18{
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

// Get returns a NotificationRecord18 by id.
func (s *NotificationRecord18Service) Get(ctx context.Context, id string) (*models.NotificationRecord18, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord18 pages.
func (s *NotificationRecord18Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord18, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord18.
func (s *NotificationRecord18Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord18) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord18.
func (s *NotificationRecord18Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord18 by external code prefix.
func (s *NotificationRecord18Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord18, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord18Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
