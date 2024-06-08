/** Domain types for patients / PatientRecord22 */
export type PatientRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord22Status;
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

export interface PatientRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord22ListResponse {
  items: PatientRecord22[];
  total?: number;
}

export interface PatientRecord22StatsResponse {
  activeCount: number;
}

export function isPatientRecord22Active(rec: PatientRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord22Label(rec: PatientRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord22ByPriority(a: PatientRecord22, b: PatientRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
