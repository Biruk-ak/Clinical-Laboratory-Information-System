/** Domain types for inventory / InventoryRecord23 */
export type InventoryRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord23Status;
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

export interface InventoryRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord23ListResponse {
  items: InventoryRecord23[];
  total?: number;
}

export interface InventoryRecord23StatsResponse {
  activeCount: number;
}

export function isInventoryRecord23Active(rec: InventoryRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord23Label(rec: InventoryRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord23ByPriority(a: InventoryRecord23, b: InventoryRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
