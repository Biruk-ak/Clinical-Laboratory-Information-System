/** Domain types for equipment / EquipmentRecord16 */
export type EquipmentRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord16Status;
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

export interface EquipmentRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord16ListResponse {
  items: EquipmentRecord16[];
  total?: number;
}

export interface EquipmentRecord16StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord16Active(rec: EquipmentRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord16Label(rec: EquipmentRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord16ByPriority(a: EquipmentRecord16, b: EquipmentRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
