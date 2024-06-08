/** Domain types for patients / PatientRecord09 */
export type PatientRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord09Status;
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

export interface PatientRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord09ListResponse {
  items: PatientRecord09[];
  total?: number;
}

export interface PatientRecord09StatsResponse {
  activeCount: number;
}

export function isPatientRecord09Active(rec: PatientRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord09Label(rec: PatientRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord09ByPriority(a: PatientRecord09, b: PatientRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
