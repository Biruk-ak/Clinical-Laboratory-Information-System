/** Domain types for inventory / InventoryRecord13 */
export type InventoryRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord13Status;
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

export interface InventoryRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord13ListResponse {
  items: InventoryRecord13[];
  total?: number;
}

export interface InventoryRecord13StatsResponse {
  activeCount: number;
}

export function isInventoryRecord13Active(rec: InventoryRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord13Label(rec: InventoryRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord13ByPriority(a: InventoryRecord13, b: InventoryRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
