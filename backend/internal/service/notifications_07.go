package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord07Service encapsulates business rules for NotificationRecord07.
type NotificationRecord07Service struct {
	repo *repository.NotificationRecord07Repository
}

// NewNotificationRecord07Service wires the service.
func NewNotificationRecord07Service(repo *repository.NotificationRecord07Repository) *NotificationRecord07Service {
	return &NotificationRecord07Service{repo: repo}
}

// Create validates and persists a new NotificationRecord07.
func (s *NotificationRecord07Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord07, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord07{
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

// Get returns a NotificationRecord07 by id.
func (s *NotificationRecord07Service) Get(ctx context.Context, id string) (*models.NotificationRecord07, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord07 pages.
func (s *NotificationRecord07Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord07, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord07.
func (s *NotificationRecord07Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord07) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord07.
func (s *NotificationRecord07Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord07 by external code prefix.
func (s *NotificationRecord07Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord07, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord07Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
