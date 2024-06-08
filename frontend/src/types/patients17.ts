/** Domain types for patients / PatientRecord17 */
export type PatientRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord17Status;
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

export interface PatientRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord17ListResponse {
  items: PatientRecord17[];
  total?: number;
}

export interface PatientRecord17StatsResponse {
  activeCount: number;
}

export function isPatientRecord17Active(rec: PatientRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord17Label(rec: PatientRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord17ByPriority(a: PatientRecord17, b: PatientRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
