/** Domain types for equipment / EquipmentRecord03 */
export type EquipmentRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord03Status;
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

export interface EquipmentRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord03ListResponse {
  items: EquipmentRecord03[];
  total?: number;
}

export interface EquipmentRecord03StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord03Active(rec: EquipmentRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord03Label(rec: EquipmentRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord03ByPriority(a: EquipmentRecord03, b: EquipmentRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
