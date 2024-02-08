/** Domain types for equipment / EquipmentRecord01 */
export type EquipmentRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord01Status;
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

export interface EquipmentRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord01ListResponse {
  items: EquipmentRecord01[];
  total?: number;
}

export interface EquipmentRecord01StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord01Active(rec: EquipmentRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord01Label(rec: EquipmentRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord01ByPriority(a: EquipmentRecord01, b: EquipmentRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
