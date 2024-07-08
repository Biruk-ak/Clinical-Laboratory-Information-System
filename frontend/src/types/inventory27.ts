/** Domain types for inventory / InventoryRecord27 */
export type InventoryRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord27Status;
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

export interface InventoryRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord27ListResponse {
  items: InventoryRecord27[];
  total?: number;
}

export interface InventoryRecord27StatsResponse {
  activeCount: number;
}

export function isInventoryRecord27Active(rec: InventoryRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord27Label(rec: InventoryRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord27ByPriority(a: InventoryRecord27, b: InventoryRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
