/** Domain types for patients / PatientRecord26 */
export type PatientRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord26Status;
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

export interface PatientRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord26ListResponse {
  items: PatientRecord26[];
  total?: number;
}

export interface PatientRecord26StatsResponse {
  activeCount: number;
}

export function isPatientRecord26Active(rec: PatientRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord26Label(rec: PatientRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord26ByPriority(a: PatientRecord26, b: PatientRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
