/** Domain types for patients / PatientRecord23 */
export type PatientRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord23Status;
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

export interface PatientRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord23ListResponse {
  items: PatientRecord23[];
  total?: number;
}

export interface PatientRecord23StatsResponse {
  activeCount: number;
}

export function isPatientRecord23Active(rec: PatientRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord23Label(rec: PatientRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord23ByPriority(a: PatientRecord23, b: PatientRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
