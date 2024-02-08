/** Domain types for equipment / EquipmentRecord10 */
export type EquipmentRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord10Status;
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

export interface EquipmentRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord10ListResponse {
  items: EquipmentRecord10[];
  total?: number;
}

export interface EquipmentRecord10StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord10Active(rec: EquipmentRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord10Label(rec: EquipmentRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord10ByPriority(a: EquipmentRecord10, b: EquipmentRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
