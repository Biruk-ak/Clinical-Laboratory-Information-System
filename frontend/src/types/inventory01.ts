/** Domain types for inventory / InventoryRecord01 */
export type InventoryRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord01Status;
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

export interface InventoryRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord01ListResponse {
  items: InventoryRecord01[];
  total?: number;
}

export interface InventoryRecord01StatsResponse {
  activeCount: number;
}

export function isInventoryRecord01Active(rec: InventoryRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord01Label(rec: InventoryRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord01ByPriority(a: InventoryRecord01, b: InventoryRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
