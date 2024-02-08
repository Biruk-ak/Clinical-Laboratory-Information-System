/** Domain types for equipment / EquipmentRecord06 */
export type EquipmentRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord06Status;
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

export interface EquipmentRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord06ListResponse {
  items: EquipmentRecord06[];
  total?: number;
}

export interface EquipmentRecord06StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord06Active(rec: EquipmentRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord06Label(rec: EquipmentRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord06ByPriority(a: EquipmentRecord06, b: EquipmentRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
