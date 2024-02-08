/** Domain types for equipment / EquipmentRecord08 */
export type EquipmentRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord08Status;
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

export interface EquipmentRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord08ListResponse {
  items: EquipmentRecord08[];
  total?: number;
}

export interface EquipmentRecord08StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord08Active(rec: EquipmentRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord08Label(rec: EquipmentRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord08ByPriority(a: EquipmentRecord08, b: EquipmentRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
