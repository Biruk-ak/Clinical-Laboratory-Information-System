/** Domain types for equipment / EquipmentRecord20 */
export type EquipmentRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord20Status;
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

export interface EquipmentRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord20ListResponse {
  items: EquipmentRecord20[];
  total?: number;
}

export interface EquipmentRecord20StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord20Active(rec: EquipmentRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord20Label(rec: EquipmentRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord20ByPriority(a: EquipmentRecord20, b: EquipmentRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
