/** Domain types for inventory / InventoryRecord16 */
export type InventoryRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord16Status;
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

export interface InventoryRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord16ListResponse {
  items: InventoryRecord16[];
  total?: number;
}

export interface InventoryRecord16StatsResponse {
  activeCount: number;
}

export function isInventoryRecord16Active(rec: InventoryRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord16Label(rec: InventoryRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord16ByPriority(a: InventoryRecord16, b: InventoryRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
