/** Domain types for patients / PatientRecord27 */
export type PatientRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord27Status;
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

export interface PatientRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord27ListResponse {
  items: PatientRecord27[];
  total?: number;
}

export interface PatientRecord27StatsResponse {
  activeCount: number;
}

export function isPatientRecord27Active(rec: PatientRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord27Label(rec: PatientRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord27ByPriority(a: PatientRecord27, b: PatientRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
