/** Domain types for equipment / EquipmentRecord14 */
export type EquipmentRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord14Status;
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

export interface EquipmentRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord14ListResponse {
  items: EquipmentRecord14[];
  total?: number;
}

export interface EquipmentRecord14StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord14Active(rec: EquipmentRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord14Label(rec: EquipmentRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord14ByPriority(a: EquipmentRecord14, b: EquipmentRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
