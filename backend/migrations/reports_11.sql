-- Migration for reports slice 11
CREATE TABLE IF NOT EXISTS reports_11_records (
  id            TEXT PRIMARY KEY,
  external_code TEXT NOT NULL,
  display_name  TEXT NOT NULL,
  status        TEXT NOT NULL,
  priority      INTEGER NOT NULL DEFAULT 0,
  facility_id   TEXT NOT NULL,
  created_by    TEXT NOT NULL,
  updated_by    TEXT NOT NULL,
  notes         TEXT NOT NULL DEFAULT '',
  metadata_json TEXT NOT NULL DEFAULT '{}',
  version       BIGINT NOT NULL DEFAULT 1,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL,
  updated_at    TIMESTAMPTZ NOT NULL,
  archived_at   TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS idx_reports_11_facility_active
  ON reports_11_records (facility_id, is_active, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_reports_11_external_code
  ON reports_11_records (facility_id, external_code);
