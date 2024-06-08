/** Domain types for patients / PatientRecord02 */
export type PatientRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord02Status;
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

export interface PatientRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord02ListResponse {
  items: PatientRecord02[];
  total?: number;
}

export interface PatientRecord02StatsResponse {
  activeCount: number;
}

export function isPatientRecord02Active(rec: PatientRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord02Label(rec: PatientRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord02ByPriority(a: PatientRecord02, b: PatientRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
