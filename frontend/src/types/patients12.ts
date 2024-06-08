/** Domain types for patients / PatientRecord12 */
export type PatientRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord12Status;
  priority: number;
  facilityId: string;
  createdBy: string;
  updatedBy: string;
  notes: string;
  metadataJson: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface PatientRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord12ListResponse {
  items: PatientRecord12[];
  total?: number;
}

export interface PatientRecord12StatsResponse {
  activeCount: number;
}

export function isPatientRecord12Active(rec: PatientRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord12Label(rec: PatientRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord12ByPriority(a: PatientRecord12, b: PatientRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
