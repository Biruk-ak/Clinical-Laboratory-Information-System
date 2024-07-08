/** Domain types for inventory / InventoryRecord07 */
export type InventoryRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord07Status;
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

export interface InventoryRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord07ListResponse {
  items: InventoryRecord07[];
  total?: number;
}

export interface InventoryRecord07StatsResponse {
  activeCount: number;
}

export function isInventoryRecord07Active(rec: InventoryRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord07Label(rec: InventoryRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord07ByPriority(a: InventoryRecord07, b: InventoryRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
