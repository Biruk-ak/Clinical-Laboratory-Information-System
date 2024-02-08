/** Domain types for equipment / EquipmentRecord19 */
export type EquipmentRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord19Status;
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

export interface EquipmentRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord19ListResponse {
  items: EquipmentRecord19[];
  total?: number;
}

export interface EquipmentRecord19StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord19Active(rec: EquipmentRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord19Label(rec: EquipmentRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord19ByPriority(a: EquipmentRecord19, b: EquipmentRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
