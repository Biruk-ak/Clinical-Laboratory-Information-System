/** Domain types for equipment / EquipmentRecord17 */
export type EquipmentRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord17Status;
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

export interface EquipmentRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord17ListResponse {
  items: EquipmentRecord17[];
  total?: number;
}

export interface EquipmentRecord17StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord17Active(rec: EquipmentRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord17Label(rec: EquipmentRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord17ByPriority(a: EquipmentRecord17, b: EquipmentRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
