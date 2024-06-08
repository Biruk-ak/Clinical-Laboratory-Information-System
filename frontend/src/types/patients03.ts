/** Domain types for patients / PatientRecord03 */
export type PatientRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord03Status;
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

export interface PatientRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord03ListResponse {
  items: PatientRecord03[];
  total?: number;
}

export interface PatientRecord03StatsResponse {
  activeCount: number;
}

export function isPatientRecord03Active(rec: PatientRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord03Label(rec: PatientRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord03ByPriority(a: PatientRecord03, b: PatientRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
