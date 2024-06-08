/** Domain types for patients / PatientRecord01 */
export type PatientRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord01Status;
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

export interface PatientRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord01ListResponse {
  items: PatientRecord01[];
  total?: number;
}

export interface PatientRecord01StatsResponse {
  activeCount: number;
}

export function isPatientRecord01Active(rec: PatientRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord01Label(rec: PatientRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord01ByPriority(a: PatientRecord01, b: PatientRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
