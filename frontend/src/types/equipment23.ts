/** Domain types for equipment / EquipmentRecord23 */
export type EquipmentRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord23Status;
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

export interface EquipmentRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord23ListResponse {
  items: EquipmentRecord23[];
  total?: number;
}

export interface EquipmentRecord23StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord23Active(rec: EquipmentRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord23Label(rec: EquipmentRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord23ByPriority(a: EquipmentRecord23, b: EquipmentRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
