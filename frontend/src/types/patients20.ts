/** Domain types for patients / PatientRecord20 */
export type PatientRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord20Status;
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

export interface PatientRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord20ListResponse {
  items: PatientRecord20[];
  total?: number;
}

export interface PatientRecord20StatsResponse {
  activeCount: number;
}

export function isPatientRecord20Active(rec: PatientRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord20Label(rec: PatientRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord20ByPriority(a: PatientRecord20, b: PatientRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
