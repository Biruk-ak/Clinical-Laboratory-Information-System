/** Domain types for patients / PatientRecord08 */
export type PatientRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord08Status;
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

export interface PatientRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord08ListResponse {
  items: PatientRecord08[];
  total?: number;
}

export interface PatientRecord08StatsResponse {
  activeCount: number;
}

export function isPatientRecord08Active(rec: PatientRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord08Label(rec: PatientRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord08ByPriority(a: PatientRecord08, b: PatientRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
