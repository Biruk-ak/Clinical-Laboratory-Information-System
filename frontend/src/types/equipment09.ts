/** Domain types for equipment / EquipmentRecord09 */
export type EquipmentRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord09Status;
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

export interface EquipmentRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord09ListResponse {
  items: EquipmentRecord09[];
  total?: number;
}

export interface EquipmentRecord09StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord09Active(rec: EquipmentRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord09Label(rec: EquipmentRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord09ByPriority(a: EquipmentRecord09, b: EquipmentRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
