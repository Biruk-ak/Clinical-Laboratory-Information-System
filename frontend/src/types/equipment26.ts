/** Domain types for equipment / EquipmentRecord26 */
export type EquipmentRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord26Status;
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

export interface EquipmentRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord26ListResponse {
  items: EquipmentRecord26[];
  total?: number;
}

export interface EquipmentRecord26StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord26Active(rec: EquipmentRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord26Label(rec: EquipmentRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord26ByPriority(a: EquipmentRecord26, b: EquipmentRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
