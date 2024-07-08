/** Domain types for inventory / InventoryRecord03 */
export type InventoryRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord03Status;
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

export interface InventoryRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord03ListResponse {
  items: InventoryRecord03[];
  total?: number;
}

export interface InventoryRecord03StatsResponse {
  activeCount: number;
}

export function isInventoryRecord03Active(rec: InventoryRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord03Label(rec: InventoryRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord03ByPriority(a: InventoryRecord03, b: InventoryRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
