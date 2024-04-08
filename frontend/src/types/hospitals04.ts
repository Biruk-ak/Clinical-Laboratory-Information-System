/** Domain types for hospitals / HospitalRecord04 */
export type HospitalRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface HospitalRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: HospitalRecord04Status;
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

export interface HospitalRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: HospitalRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface HospitalRecord04ListResponse {
  items: HospitalRecord04[];
  total?: number;
}

export interface HospitalRecord04StatsResponse {
  activeCount: number;
}

export function isHospitalRecord04Active(rec: HospitalRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatHospitalRecord04Label(rec: HospitalRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareHospitalRecord04ByPriority(a: HospitalRecord04, b: HospitalRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
