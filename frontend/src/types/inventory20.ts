/** Domain types for inventory / InventoryRecord20 */
export type InventoryRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord20Status;
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

export interface InventoryRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord20ListResponse {
  items: InventoryRecord20[];
  total?: number;
}

export interface InventoryRecord20StatsResponse {
  activeCount: number;
}

export function isInventoryRecord20Active(rec: InventoryRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord20Label(rec: InventoryRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord20ByPriority(a: InventoryRecord20, b: InventoryRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
