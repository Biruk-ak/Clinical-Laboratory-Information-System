/** Domain types for patients / PatientRecord18 */
export type PatientRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord18Status;
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

export interface PatientRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord18ListResponse {
  items: PatientRecord18[];
  total?: number;
}

export interface PatientRecord18StatsResponse {
  activeCount: number;
}

export function isPatientRecord18Active(rec: PatientRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord18Label(rec: PatientRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord18ByPriority(a: PatientRecord18, b: PatientRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
