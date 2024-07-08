/** Domain types for inventory / InventoryRecord11 */
export type InventoryRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord11Status;
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

export interface InventoryRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord11ListResponse {
  items: InventoryRecord11[];
  total?: number;
}

export interface InventoryRecord11StatsResponse {
  activeCount: number;
}

export function isInventoryRecord11Active(rec: InventoryRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord11Label(rec: InventoryRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord11ByPriority(a: InventoryRecord11, b: InventoryRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
