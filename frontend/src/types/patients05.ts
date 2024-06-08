/** Domain types for patients / PatientRecord05 */
export type PatientRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord05Status;
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

export interface PatientRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord05ListResponse {
  items: PatientRecord05[];
  total?: number;
}

export interface PatientRecord05StatsResponse {
  activeCount: number;
}

export function isPatientRecord05Active(rec: PatientRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord05Label(rec: PatientRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord05ByPriority(a: PatientRecord05, b: PatientRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
