/** Domain types for equipment / EquipmentRecord11 */
export type EquipmentRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord11Status;
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

export interface EquipmentRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord11ListResponse {
  items: EquipmentRecord11[];
  total?: number;
}

export interface EquipmentRecord11StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord11Active(rec: EquipmentRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord11Label(rec: EquipmentRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord11ByPriority(a: EquipmentRecord11, b: EquipmentRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
