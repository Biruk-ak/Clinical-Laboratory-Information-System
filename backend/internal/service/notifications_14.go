package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord14Service encapsulates business rules for NotificationRecord14.
type NotificationRecord14Service struct {
	repo *repository.NotificationRecord14Repository
}

// NewNotificationRecord14Service wires the service.
func NewNotificationRecord14Service(repo *repository.NotificationRecord14Repository) *NotificationRecord14Service {
	return &NotificationRecord14Service{repo: repo}
}

// Create validates and persists a new NotificationRecord14.
func (s *NotificationRecord14Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord14, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord14{
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

// Get returns a NotificationRecord14 by id.
func (s *NotificationRecord14Service) Get(ctx context.Context, id string) (*models.NotificationRecord14, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord14 pages.
func (s *NotificationRecord14Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord14, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord14.
func (s *NotificationRecord14Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord14) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord14.
func (s *NotificationRecord14Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord14 by external code prefix.
func (s *NotificationRecord14Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord14, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord14Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
