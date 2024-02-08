/** Domain types for equipment / EquipmentRecord15 */
export type EquipmentRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord15Status;
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

export interface EquipmentRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord15ListResponse {
  items: EquipmentRecord15[];
  total?: number;
}

export interface EquipmentRecord15StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord15Active(rec: EquipmentRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord15Label(rec: EquipmentRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord15ByPriority(a: EquipmentRecord15, b: EquipmentRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
