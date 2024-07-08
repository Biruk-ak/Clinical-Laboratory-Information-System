/** Domain types for inventory / InventoryRecord22 */
export type InventoryRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord22Status;
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

export interface InventoryRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord22ListResponse {
  items: InventoryRecord22[];
  total?: number;
}

export interface InventoryRecord22StatsResponse {
  activeCount: number;
}

export function isInventoryRecord22Active(rec: InventoryRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord22Label(rec: InventoryRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord22ByPriority(a: InventoryRecord22, b: InventoryRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
