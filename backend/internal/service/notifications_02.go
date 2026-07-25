package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord02Service encapsulates business rules for NotificationRecord02.
type NotificationRecord02Service struct {
	repo *repository.NotificationRecord02Repository
}

// NewNotificationRecord02Service wires the service.
func NewNotificationRecord02Service(repo *repository.NotificationRecord02Repository) *NotificationRecord02Service {
	return &NotificationRecord02Service{repo: repo}
}

// Create validates and persists a new NotificationRecord02.
func (s *NotificationRecord02Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord02, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord02{
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

// Get returns a NotificationRecord02 by id.
func (s *NotificationRecord02Service) Get(ctx context.Context, id string) (*models.NotificationRecord02, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord02 pages.
func (s *NotificationRecord02Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord02, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord02.
func (s *NotificationRecord02Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord02) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord02.
func (s *NotificationRecord02Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord02 by external code prefix.
func (s *NotificationRecord02Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord02, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord02Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
