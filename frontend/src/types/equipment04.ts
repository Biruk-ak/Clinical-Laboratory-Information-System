/** Domain types for equipment / EquipmentRecord04 */
export type EquipmentRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord04Status;
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

export interface EquipmentRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord04ListResponse {
  items: EquipmentRecord04[];
  total?: number;
}

export interface EquipmentRecord04StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord04Active(rec: EquipmentRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord04Label(rec: EquipmentRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord04ByPriority(a: EquipmentRecord04, b: EquipmentRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
