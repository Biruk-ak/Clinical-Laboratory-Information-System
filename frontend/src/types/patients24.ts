/** Domain types for patients / PatientRecord24 */
export type PatientRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord24Status;
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

export interface PatientRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord24ListResponse {
  items: PatientRecord24[];
  total?: number;
}

export interface PatientRecord24StatsResponse {
  activeCount: number;
}

export function isPatientRecord24Active(rec: PatientRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord24Label(rec: PatientRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord24ByPriority(a: PatientRecord24, b: PatientRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
