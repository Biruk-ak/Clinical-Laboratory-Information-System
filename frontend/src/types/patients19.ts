/** Domain types for patients / PatientRecord19 */
export type PatientRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord19Status;
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

export interface PatientRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord19ListResponse {
  items: PatientRecord19[];
  total?: number;
}

export interface PatientRecord19StatsResponse {
  activeCount: number;
}

export function isPatientRecord19Active(rec: PatientRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord19Label(rec: PatientRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord19ByPriority(a: PatientRecord19, b: PatientRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
