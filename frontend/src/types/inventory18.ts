/** Domain types for inventory / InventoryRecord18 */
export type InventoryRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord18Status;
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

export interface InventoryRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord18ListResponse {
  items: InventoryRecord18[];
  total?: number;
}

export interface InventoryRecord18StatsResponse {
  activeCount: number;
}

export function isInventoryRecord18Active(rec: InventoryRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord18Label(rec: InventoryRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord18ByPriority(a: InventoryRecord18, b: InventoryRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
