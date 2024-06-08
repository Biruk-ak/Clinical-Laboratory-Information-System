/** Domain types for patients / PatientRecord13 */
export type PatientRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord13Status;
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

export interface PatientRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord13ListResponse {
  items: PatientRecord13[];
  total?: number;
}

export interface PatientRecord13StatsResponse {
  activeCount: number;
}

export function isPatientRecord13Active(rec: PatientRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord13Label(rec: PatientRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord13ByPriority(a: PatientRecord13, b: PatientRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
