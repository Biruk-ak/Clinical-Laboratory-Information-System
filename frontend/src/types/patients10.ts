/** Domain types for patients / PatientRecord10 */
export type PatientRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord10Status;
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

export interface PatientRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord10ListResponse {
  items: PatientRecord10[];
  total?: number;
}

export interface PatientRecord10StatsResponse {
  activeCount: number;
}

export function isPatientRecord10Active(rec: PatientRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord10Label(rec: PatientRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord10ByPriority(a: PatientRecord10, b: PatientRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
