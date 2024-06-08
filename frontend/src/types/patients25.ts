/** Domain types for patients / PatientRecord25 */
export type PatientRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord25Status;
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

export interface PatientRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord25ListResponse {
  items: PatientRecord25[];
  total?: number;
}

export interface PatientRecord25StatsResponse {
  activeCount: number;
}

export function isPatientRecord25Active(rec: PatientRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord25Label(rec: PatientRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord25ByPriority(a: PatientRecord25, b: PatientRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
