/** Domain types for equipment / EquipmentRecord28 */
export type EquipmentRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord28Status;
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

export interface EquipmentRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord28ListResponse {
  items: EquipmentRecord28[];
  total?: number;
}

export interface EquipmentRecord28StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord28Active(rec: EquipmentRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord28Label(rec: EquipmentRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord28ByPriority(a: EquipmentRecord28, b: EquipmentRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
