/** Domain types for equipment / EquipmentRecord22 */
export type EquipmentRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord22Status;
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

export interface EquipmentRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord22ListResponse {
  items: EquipmentRecord22[];
  total?: number;
}

export interface EquipmentRecord22StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord22Active(rec: EquipmentRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord22Label(rec: EquipmentRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord22ByPriority(a: EquipmentRecord22, b: EquipmentRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
