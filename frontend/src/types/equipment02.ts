/** Domain types for equipment / EquipmentRecord02 */
export type EquipmentRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord02Status;
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

export interface EquipmentRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord02ListResponse {
  items: EquipmentRecord02[];
  total?: number;
}

export interface EquipmentRecord02StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord02Active(rec: EquipmentRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord02Label(rec: EquipmentRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord02ByPriority(a: EquipmentRecord02, b: EquipmentRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
