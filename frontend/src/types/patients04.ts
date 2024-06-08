/** Domain types for patients / PatientRecord04 */
export type PatientRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface PatientRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: PatientRecord04Status;
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

export interface PatientRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: PatientRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface PatientRecord04ListResponse {
  items: PatientRecord04[];
  total?: number;
}

export interface PatientRecord04StatsResponse {
  activeCount: number;
}

export function isPatientRecord04Active(rec: PatientRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatPatientRecord04Label(rec: PatientRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function comparePatientRecord04ByPriority(a: PatientRecord04, b: PatientRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
