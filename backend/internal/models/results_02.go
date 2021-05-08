package models


import (
	"time"
)

// ResultRecord02 represents a domain record in the results bounded context.
type ResultRecord02 struct {
	ID            string    `json:"id" db:"id"`
	ExternalCode  string    `json:"external_code" db:"external_code"`
	DisplayName   string    `json:"display_name" db:"display_name"`
	Status        string    `json:"status" db:"status"`
	Priority      int       `json:"priority" db:"priority"`
	FacilityID    string    `json:"facility_id" db:"facility_id"`
	CreatedBy     string    `json:"created_by" db:"created_by"`
	UpdatedBy     string    `json:"updated_by" db:"updated_by"`
	Notes         string    `json:"notes" db:"notes"`
	MetadataJSON  string    `json:"metadata_json" db:"metadata_json"`
	Version       int64     `json:"version" db:"version"`
	IsActive      bool      `json:"is_active" db:"is_active"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
	ArchivedAt    *time.Time `json:"archived_at,omitempty" db:"archived_at"`
}

// Validate performs lightweight domain validation for ResultRecord02.
func (r *ResultRecord02) Validate() error {
	if r.ID == "" {
		return ErrInvalidID
	}
	if r.DisplayName == "" {
		return ErrMissingDisplayName
	}
	if r.Status == "" {
		return ErrMissingStatus
	}
	if r.Priority < 0 || r.Priority > 100 {
		return ErrInvalidPriority
	}
	return nil
}

// SoftArchive marks the record inactive and stamps archive time.
func (r *ResultRecord02) SoftArchive(actor string, at time.Time) {
	r.IsActive = false
	r.UpdatedBy = actor
	r.UpdatedAt = at
	r.ArchivedAt = &at
	r.Version++
}

// Touch bumps version and update timestamps for optimistic concurrency.
func (r *ResultRecord02) Touch(actor string, at time.Time) {
	r.UpdatedBy = actor
	r.UpdatedAt = at
	r.Version++
}
