/** Domain types for inventory / InventoryRecord28 */
export type InventoryRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord28Status;
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

export interface InventoryRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord28ListResponse {
  items: InventoryRecord28[];
  total?: number;
}

export interface InventoryRecord28StatsResponse {
  activeCount: number;
}

export function isInventoryRecord28Active(rec: InventoryRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord28Label(rec: InventoryRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord28ByPriority(a: InventoryRecord28, b: InventoryRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
