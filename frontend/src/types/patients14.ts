/** Domain types for patients / PatientRecord14 */
export type PatientRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord14Status;
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

export interface PatientRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord14ListResponse {
  items: PatientRecord14[];
  total?: number;
}

export interface PatientRecord14StatsResponse {
  activeCount: number;
}

export function isPatientRecord14Active(rec: PatientRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord14Label(rec: PatientRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord14ByPriority(a: PatientRecord14, b: PatientRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
