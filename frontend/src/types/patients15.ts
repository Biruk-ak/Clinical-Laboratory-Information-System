/** Domain types for patients / PatientRecord15 */
export type PatientRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord15Status;
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

export interface PatientRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord15ListResponse {
  items: PatientRecord15[];
  total?: number;
}

export interface PatientRecord15StatsResponse {
  activeCount: number;
}

export function isPatientRecord15Active(rec: PatientRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord15Label(rec: PatientRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord15ByPriority(a: PatientRecord15, b: PatientRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
