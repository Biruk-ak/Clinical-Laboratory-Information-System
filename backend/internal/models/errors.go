package models

import "errors"

var (
	ErrInvalidID          = errors.New("invalid id")
	ErrMissingDisplayName = errors.New("missing display name")
	ErrMissingStatus      = errors.New("missing status")
	ErrInvalidPriority    = errors.New("invalid priority")
	ErrNotFound           = errors.New("record not found")
	ErrConflict           = errors.New("version conflict")
	ErrUnauthorized       = errors.New("unauthorized")
	ErrForbidden          = errors.New("forbidden")
	ErrValidation         = errors.New("validation failed")
)
