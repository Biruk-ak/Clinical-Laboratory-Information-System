/** Domain types for patients / PatientRecord11 */
export type PatientRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord11Status;
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

export interface PatientRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord11ListResponse {
  items: PatientRecord11[];
  total?: number;
}

export interface PatientRecord11StatsResponse {
  activeCount: number;
}

export function isPatientRecord11Active(rec: PatientRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord11Label(rec: PatientRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord11ByPriority(a: PatientRecord11, b: PatientRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
