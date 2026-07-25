package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// NotificationRecord04Service encapsulates business rules for NotificationRecord04.
type NotificationRecord04Service struct {
	repo *repository.NotificationRecord04Repository
}

// NewNotificationRecord04Service wires the service.
func NewNotificationRecord04Service(repo *repository.NotificationRecord04Repository) *NotificationRecord04Service {
	return &NotificationRecord04Service{repo: repo}
}

// Create validates and persists a new NotificationRecord04.
func (s *NotificationRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.NotificationRecord04, error) {
	now := time.Now().UTC()
	rec := &models.NotificationRecord04{
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

// Get returns a NotificationRecord04 by id.
func (s *NotificationRecord04Service) Get(ctx context.Context, id string) (*models.NotificationRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped NotificationRecord04 pages.
func (s *NotificationRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.NotificationRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing NotificationRecord04.
func (s *NotificationRecord04Service) Update(ctx context.Context, actor string, rec *models.NotificationRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.UpdatedBy = actor
	rec.UpdatedAt = time.Now().UTC()
	// repository Update applies optimistic locking and increments version
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a NotificationRecord04.
func (s *NotificationRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds NotificationRecord04 by external code prefix.
func (s *NotificationRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.NotificationRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *NotificationRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
