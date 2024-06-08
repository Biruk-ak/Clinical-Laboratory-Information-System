/** Domain types for patients / PatientRecord28 */
export type PatientRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord28Status;
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

export interface PatientRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord28ListResponse {
  items: PatientRecord28[];
  total?: number;
}

export interface PatientRecord28StatsResponse {
  activeCount: number;
}

export function isPatientRecord28Active(rec: PatientRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord28Label(rec: PatientRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord28ByPriority(a: PatientRecord28, b: PatientRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
