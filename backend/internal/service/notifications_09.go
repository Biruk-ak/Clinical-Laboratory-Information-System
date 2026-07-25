package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord09Service encapsulates business rules for NotificationRecord09.
type NotificationRecord09Service struct {
	repo *repository.NotificationRecord09Repository
}

// NewNotificationRecord09Service wires the service.
func NewNotificationRecord09Service(repo *repository.NotificationRecord09Repository) *NotificationRecord09Service {
	return &NotificationRecord09Service{repo: repo}
}

// Create validates and persists a new NotificationRecord09.
func (s *NotificationRecord09Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord09, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord09{
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

// Get returns a NotificationRecord09 by id.
func (s *NotificationRecord09Service) Get(ctx context.Context, id string) (*models.NotificationRecord09, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord09 pages.
func (s *NotificationRecord09Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord09, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord09.
func (s *NotificationRecord09Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord09) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord09.
func (s *NotificationRecord09Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord09 by external code prefix.
func (s *NotificationRecord09Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord09, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord09Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
