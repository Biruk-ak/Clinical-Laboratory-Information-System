/** Domain types for inventory / InventoryRecord10 */
export type InventoryRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord10Status;
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

export interface InventoryRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord10ListResponse {
  items: InventoryRecord10[];
  total?: number;
}

export interface InventoryRecord10StatsResponse {
  activeCount: number;
}

export function isInventoryRecord10Active(rec: InventoryRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord10Label(rec: InventoryRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord10ByPriority(a: InventoryRecord10, b: InventoryRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
