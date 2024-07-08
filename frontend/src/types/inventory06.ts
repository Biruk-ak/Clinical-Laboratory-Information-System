/** Domain types for inventory / InventoryRecord06 */
export type InventoryRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord06Status;
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

export interface InventoryRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord06ListResponse {
  items: InventoryRecord06[];
  total?: number;
}

export interface InventoryRecord06StatsResponse {
  activeCount: number;
}

export function isInventoryRecord06Active(rec: InventoryRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord06Label(rec: InventoryRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord06ByPriority(a: InventoryRecord06, b: InventoryRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
