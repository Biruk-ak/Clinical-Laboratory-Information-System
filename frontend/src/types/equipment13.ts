/** Domain types for equipment / EquipmentRecord13 */
export type EquipmentRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord13Status;
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

export interface EquipmentRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord13ListResponse {
  items: EquipmentRecord13[];
  total?: number;
}

export interface EquipmentRecord13StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord13Active(rec: EquipmentRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord13Label(rec: EquipmentRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord13ByPriority(a: EquipmentRecord13, b: EquipmentRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
