/** Domain types for equipment / EquipmentRecord25 */
export type EquipmentRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord25Status;
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

export interface EquipmentRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord25ListResponse {
  items: EquipmentRecord25[];
  total?: number;
}

export interface EquipmentRecord25StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord25Active(rec: EquipmentRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord25Label(rec: EquipmentRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord25ByPriority(a: EquipmentRecord25, b: EquipmentRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
