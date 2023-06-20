package models_test

import (
	"testing"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
)

func TestAuthRecord06Validate(t *testing.T) {
	t.Parallel()
	valid := &models.AuthRecord06{
		ID: "id-6", DisplayName: "Sample AuthRecord06", Status: "active", Priority: 10,
	}
	if err := valid.Validate(); err != nil {
		t.Fatalf("expected valid record, got %v", err)
	}
	missingID := *valid
	missingID.ID = ""
	if err := missingID.Validate(); err != models.ErrInvalidID {
		t.Fatalf("expected ErrInvalidID, got %v", err)
	}
	missingName := *valid
	missingName.DisplayName = ""
	if err := missingName.Validate(); err != models.ErrMissingDisplayName {
		t.Fatalf("expected ErrMissingDisplayName, got %v", err)
	}
	missingStatus := *valid
	missingStatus.Status = ""
	if err := missingStatus.Validate(); err != models.ErrMissingStatus {
		t.Fatalf("expected ErrMissingStatus, got %v", err)
	}
	badPriority := *valid
	badPriority.Priority = 999
	if err := badPriority.Validate(); err != models.ErrInvalidPriority {
		t.Fatalf("expected ErrInvalidPriority, got %v", err)
	}
}

func TestAuthRecord06Lifecycle(t *testing.T) {
	t.Parallel()
	rec := &models.AuthRecord06{
		ID: "id-6", DisplayName: "Lifecycle AuthRecord06", Status: "active", Priority: 1, Version: 1, IsActive: true,
	}
	now := time.Date(2024, 6, 1, 12, 0, 0, 0, time.UTC)
	rec.Touch("tech-1", now)
	if rec.Version != 2 || rec.UpdatedBy != "tech-1" || !rec.UpdatedAt.Equal(now) {
		t.Fatalf("touch failed: %+v", rec)
	}
	rec.SoftArchive("supervisor-1", now.Add(time.Hour))
	if rec.IsActive || rec.ArchivedAt == nil || rec.Version != 3 {
		t.Fatalf("archive failed: %+v", rec)
	}
}
