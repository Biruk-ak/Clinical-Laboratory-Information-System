/** Domain types for equipment / EquipmentRecord05 */
export type EquipmentRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface EquipmentRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: EquipmentRecord05Status;
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

export interface EquipmentRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: EquipmentRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface EquipmentRecord05ListResponse {
  items: EquipmentRecord05[];
  total?: number;
}

export interface EquipmentRecord05StatsResponse {
  activeCount: number;
}

export function isEquipmentRecord05Active(rec: EquipmentRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatEquipmentRecord05Label(rec: EquipmentRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareEquipmentRecord05ByPriority(a: EquipmentRecord05, b: EquipmentRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
