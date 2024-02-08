/** Domain types for equipment / EquipmentRecord27 */
export type EquipmentRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord27Status;
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

export interface EquipmentRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord27ListResponse {
  items: EquipmentRecord27[];
  total?: number;
}

export interface EquipmentRecord27StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord27Active(rec: EquipmentRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord27Label(rec: EquipmentRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord27ByPriority(a: EquipmentRecord27, b: EquipmentRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
