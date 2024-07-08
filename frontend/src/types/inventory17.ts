/** Domain types for inventory / InventoryRecord17 */
export type InventoryRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord17Status;
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

export interface InventoryRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord17ListResponse {
  items: InventoryRecord17[];
  total?: number;
}

export interface InventoryRecord17StatsResponse {
  activeCount: number;
}

export function isInventoryRecord17Active(rec: InventoryRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord17Label(rec: InventoryRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord17ByPriority(a: InventoryRecord17, b: InventoryRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
