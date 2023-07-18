package service_test

import (
	"testing"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
)

func TestLabTestRecord28ValidateRules(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name    string
		rec     models.LabTestRecord28
		wantErr error
	}{
		{"ok", models.LabTestRecord28{ID: "1", DisplayName: "A", Status: "open", Priority: 1}, nil},
		{"bad-id", models.LabTestRecord28{DisplayName: "A", Status: "open", Priority: 1}, models.ErrInvalidID},
		{"bad-name", models.LabTestRecord28{ID: "1", Status: "open", Priority: 1}, models.ErrMissingDisplayName},
		{"bad-status", models.LabTestRecord28{ID: "1", DisplayName: "A", Priority: 1}, models.ErrMissingStatus},
		{"bad-priority", models.LabTestRecord28{ID: "1", DisplayName: "A", Status: "open", Priority: -1}, models.ErrInvalidPriority},
	}
	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			err := tc.rec.Validate()
			if err != tc.wantErr {
				t.Fatalf("got %v want %v", err, tc.wantErr)
			}
		})
	}
}

func TestLabTestRecord28TouchIncrementsVersion(t *testing.T) {
	t.Parallel()
	rec := &models.LabTestRecord28{ID: "x", DisplayName: "n", Status: "s", Priority: 2, Version: 5}
	at := time.Unix(1_700_000_000, 0).UTC()
	rec.Touch("u", at)
	if rec.Version != 6 {
		t.Fatalf("version=%d", rec.Version)
	}
}
