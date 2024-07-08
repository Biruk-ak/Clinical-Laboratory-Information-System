/** Domain types for inventory / InventoryRecord19 */
export type InventoryRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord19Status;
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

export interface InventoryRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord19ListResponse {
  items: InventoryRecord19[];
  total?: number;
}

export interface InventoryRecord19StatsResponse {
  activeCount: number;
}

export function isInventoryRecord19Active(rec: InventoryRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord19Label(rec: InventoryRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord19ByPriority(a: InventoryRecord19, b: InventoryRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
