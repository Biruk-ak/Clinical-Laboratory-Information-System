/** Domain types for patients / PatientRecord07 */
export type PatientRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord07Status;
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

export interface PatientRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord07ListResponse {
  items: PatientRecord07[];
  total?: number;
}

export interface PatientRecord07StatsResponse {
  activeCount: number;
}

export function isPatientRecord07Active(rec: PatientRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord07Label(rec: PatientRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord07ByPriority(a: PatientRecord07, b: PatientRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
