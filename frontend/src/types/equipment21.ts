/** Domain types for equipment / EquipmentRecord21 */
export type EquipmentRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord21Status;
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

export interface EquipmentRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord21ListResponse {
  items: EquipmentRecord21[];
  total?: number;
}

export interface EquipmentRecord21StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord21Active(rec: EquipmentRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord21Label(rec: EquipmentRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord21ByPriority(a: EquipmentRecord21, b: EquipmentRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
