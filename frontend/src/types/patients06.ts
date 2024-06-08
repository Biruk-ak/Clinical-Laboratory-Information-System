/** Domain types for patients / PatientRecord06 */
export type PatientRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord06Status;
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

export interface PatientRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord06ListResponse {
  items: PatientRecord06[];
  total?: number;
}

export interface PatientRecord06StatsResponse {
  activeCount: number;
}

export function isPatientRecord06Active(rec: PatientRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord06Label(rec: PatientRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord06ByPriority(a: PatientRecord06, b: PatientRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
