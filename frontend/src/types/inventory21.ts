/** Domain types for inventory / InventoryRecord21 */
export type InventoryRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord21Status;
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

export interface InventoryRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord21ListResponse {
  items: InventoryRecord21[];
  total?: number;
}

export interface InventoryRecord21StatsResponse {
  activeCount: number;
}

export function isInventoryRecord21Active(rec: InventoryRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord21Label(rec: InventoryRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord21ByPriority(a: InventoryRecord21, b: InventoryRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
