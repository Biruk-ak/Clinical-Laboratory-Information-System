package service


import (
	"context"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/repository"
	"github.com/google/uuid"
)

// ReportRecord04Service encapsulates business rules for ReportRecord04.
type ReportRecord04Service struct {
	repo *repository.ReportRecord04Repository
}

// NewReportRecord04Service wires the service.
func NewReportRecord04Service(repo *repository.ReportRecord04Repository) *ReportRecord04Service {
	return &ReportRecord04Service{repo: repo}
}

// Create validates and persists a new ReportRecord04.
func (s *ReportRecord04Service) Create(ctx context.Context, actor, facilityID, code, display, status string, priority int, notes string) (*models.ReportRecord04, error) {
	now := time.Now().UTC()
	rec := &models.ReportRecord04{
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

// Get returns a ReportRecord04 by id.
func (s *ReportRecord04Service) Get(ctx context.Context, id string) (*models.ReportRecord04, error) {
	return s.repo.GetByID(ctx, id)
}

// List returns facility-scoped ReportRecord04 pages.
func (s *ReportRecord04Service) List(ctx context.Context, facilityID string, limit, offset int) ([]models.ReportRecord04, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, facilityID, limit, offset)
}

// Update mutates an existing ReportRecord04.
func (s *ReportRecord04Service) Update(ctx context.Context, actor string, rec *models.ReportRecord04) error {
	if err := rec.Validate(); err != nil {
		return err
	}
	rec.Touch(actor, time.Now().UTC())
	return s.repo.Update(ctx, rec)
}

// Archive soft-deletes a ReportRecord04.
func (s *ReportRecord04Service) Archive(ctx context.Context, id, actor string) error {
	return s.repo.Delete(ctx, id, actor)
}

// Search finds ReportRecord04 by external code prefix.
func (s *ReportRecord04Service) Search(ctx context.Context, facilityID, prefix string) ([]models.ReportRecord04, error) {
	return s.repo.SearchByCode(ctx, facilityID, prefix, 100)
}

// Stats returns active counts for dashboards.
func (s *ReportRecord04Service) Stats(ctx context.Context, facilityID string) (int64, error) {
	return s.repo.CountActive(ctx, facilityID)
}
