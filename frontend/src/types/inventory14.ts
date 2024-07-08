/** Domain types for inventory / InventoryRecord14 */
export type InventoryRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord14Status;
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

export interface InventoryRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord14ListResponse {
  items: InventoryRecord14[];
  total?: number;
}

export interface InventoryRecord14StatsResponse {
  activeCount: number;
}

export function isInventoryRecord14Active(rec: InventoryRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord14Label(rec: InventoryRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord14ByPriority(a: InventoryRecord14, b: InventoryRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
