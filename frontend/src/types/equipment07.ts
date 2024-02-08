/** Domain types for equipment / EquipmentRecord07 */
export type EquipmentRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord07Status;
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

export interface EquipmentRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord07ListResponse {
  items: EquipmentRecord07[];
  total?: number;
}

export interface EquipmentRecord07StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord07Active(rec: EquipmentRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord07Label(rec: EquipmentRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord07ByPriority(a: EquipmentRecord07, b: EquipmentRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
