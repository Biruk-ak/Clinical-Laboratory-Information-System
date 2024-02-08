/** Domain types for equipment / EquipmentRecord24 */
export type EquipmentRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord24Status;
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

export interface EquipmentRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord24ListResponse {
  items: EquipmentRecord24[];
  total?: number;
}

export interface EquipmentRecord24StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord24Active(rec: EquipmentRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord24Label(rec: EquipmentRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord24ByPriority(a: EquipmentRecord24, b: EquipmentRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
