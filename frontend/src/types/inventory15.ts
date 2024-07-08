/** Domain types for inventory / InventoryRecord15 */
export type InventoryRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord15Status;
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

export interface InventoryRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord15ListResponse {
  items: InventoryRecord15[];
  total?: number;
}

export interface InventoryRecord15StatsResponse {
  activeCount: number;
}

export function isInventoryRecord15Active(rec: InventoryRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord15Label(rec: InventoryRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord15ByPriority(a: InventoryRecord15, b: InventoryRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
