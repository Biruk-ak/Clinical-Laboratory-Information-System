package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord17Service encapsulates business rules for NotificationRecord17.
type NotificationRecord17Service struct {
	repo *repository.NotificationRecord17Repository
}

// NewNotificationRecord17Service wires the service.
func NewNotificationRecord17Service(repo *repository.NotificationRecord17Repository) *NotificationRecord17Service {
	return &NotificationRecord17Service{repo: repo}
}

// Create validates and persists a new NotificationRecord17.
func (s *NotificationRecord17Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord17, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord17{
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

// Get returns a NotificationRecord17 by id.
func (s *NotificationRecord17Service) Get(ctx context.Context, id string) (*models.NotificationRecord17, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord17 pages.
func (s *NotificationRecord17Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord17, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord17.
func (s *NotificationRecord17Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord17) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord17.
func (s *NotificationRecord17Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord17 by external code prefix.
func (s *NotificationRecord17Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord17, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord17Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
