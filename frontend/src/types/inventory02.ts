/** Domain types for inventory / InventoryRecord02 */
export type InventoryRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord02Status;
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

export interface InventoryRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord02ListResponse {
  items: InventoryRecord02[];
  total?: number;
}

export interface InventoryRecord02StatsResponse {
  activeCount: number;
}

export function isInventoryRecord02Active(rec: InventoryRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord02Label(rec: InventoryRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord02ByPriority(a: InventoryRecord02, b: InventoryRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
