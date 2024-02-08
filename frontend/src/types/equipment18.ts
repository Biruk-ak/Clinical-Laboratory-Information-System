/** Domain types for equipment / EquipmentRecord18 */
export type EquipmentRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord18Status;
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

export interface EquipmentRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord18ListResponse {
  items: EquipmentRecord18[];
  total?: number;
}

export interface EquipmentRecord18StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord18Active(rec: EquipmentRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord18Label(rec: EquipmentRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord18ByPriority(a: EquipmentRecord18, b: EquipmentRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
