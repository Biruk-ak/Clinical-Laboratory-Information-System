package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord12Service encapsulates business rules for NotificationRecord12.
type NotificationRecord12Service struct {
	repo *repository.NotificationRecord12Repository
}

// NewNotificationRecord12Service wires the service.
func NewNotificationRecord12Service(repo *repository.NotificationRecord12Repository) *NotificationRecord12Service {
	return &NotificationRecord12Service{repo: repo}
}

// Create validates and persists a new NotificationRecord12.
func (s *NotificationRecord12Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord12, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord12{
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

// Get returns a NotificationRecord12 by id.
func (s *NotificationRecord12Service) Get(ctx context.Context, id string) (*models.NotificationRecord12, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord12 pages.
func (s *NotificationRecord12Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord12, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord12.
func (s *NotificationRecord12Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord12) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord12.
func (s *NotificationRecord12Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord12 by external code prefix.
func (s *NotificationRecord12Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord12, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord12Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
