package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord01Service encapsulates business rules for NotificationRecord01.
type NotificationRecord01Service struct {
	repo *repository.NotificationRecord01Repository
}

// NewNotificationRecord01Service wires the service.
func NewNotificationRecord01Service(repo *repository.NotificationRecord01Repository) *NotificationRecord01Service {
	return &NotificationRecord01Service{repo: repo}
}

// Create validates and persists a new NotificationRecord01.
func (s *NotificationRecord01Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord01, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord01{
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

// Get returns a NotificationRecord01 by id.
func (s *NotificationRecord01Service) Get(ctx context.Context, id string) (*models.NotificationRecord01, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord01 pages.
func (s *NotificationRecord01Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord01, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord01.
func (s *NotificationRecord01Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord01) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord01.
func (s *NotificationRecord01Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord01 by external code prefix.
func (s *NotificationRecord01Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord01, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord01Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
