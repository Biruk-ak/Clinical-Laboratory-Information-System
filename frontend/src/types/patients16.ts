/** Domain types for patients / PatientRecord16 */
export type PatientRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord16Status;
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

export interface PatientRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord16ListResponse {
  items: PatientRecord16[];
  total?: number;
}

export interface PatientRecord16StatsResponse {
  activeCount: number;
}

export function isPatientRecord16Active(rec: PatientRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord16Label(rec: PatientRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord16ByPriority(a: PatientRecord16, b: PatientRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
