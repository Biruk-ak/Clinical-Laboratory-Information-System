package service_test

import (
	"testing"
	"time"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
)

func TestNotificationRecord18ValidateRules(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name    string
		rec     models.NotificationRecord18
		wantErr error
	}{
		{"ok", models.NotificationRecord18{ID: "1", DisplayName: "A", Status: "open", Priority: 1}, nil},
		{"bad-id", models.NotificationRecord18{DisplayName: "A", Status: "open", Priority: 1}, models.ErrInvalidID},
		{"bad-name", models.NotificationRecord18{ID: "1", Status: "open", Priority: 1}, models.ErrMissingDisplayName},
		{"bad-status", models.NotificationRecord18{ID: "1", DisplayName: "A", Priority: 1}, models.ErrMissingStatus},
		{"bad-priority", models.NotificationRecord18{ID: "1", DisplayName: "A", Status: "open", Priority: -1}, models.ErrInvalidPriority},
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

func TestNotificationRecord18TouchIncrementsVersion(t *testing.T) {
	t.Parallel()
	rec := &models.NotificationRecord18{ID: "x", DisplayName: "n", Status: "s", Priority: 2, Version: 5}
	at := time.Unix(1_700_000_000, 0).UTC()
	rec.Touch("u", at)
	if rec.Version != 6 {
		t.Fatalf("version=%d", rec.Version)
	}
}
