/** Domain types for equipment / EquipmentRecord12 */
export type EquipmentRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord12Status;
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

export interface EquipmentRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord12ListResponse {
  items: EquipmentRecord12[];
  total?: number;
}

export interface EquipmentRecord12StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord12Active(rec: EquipmentRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord12Label(rec: EquipmentRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord12ByPriority(a: EquipmentRecord12, b: EquipmentRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
