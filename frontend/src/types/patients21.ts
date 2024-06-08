/** Domain types for patients / PatientRecord21 */
export type PatientRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord21Status;
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

export interface PatientRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord21ListResponse {
  items: PatientRecord21[];
  total?: number;
}

export interface PatientRecord21StatsResponse {
  activeCount: number;
}

export function isPatientRecord21Active(rec: PatientRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord21Label(rec: PatientRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord21ByPriority(a: PatientRecord21, b: PatientRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
