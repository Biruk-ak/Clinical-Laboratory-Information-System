/** Domain types for inventory / InventoryRecord26 */
export type InventoryRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord26Status;
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

export interface InventoryRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord26ListResponse {
  items: InventoryRecord26[];
  total?: number;
}

export interface InventoryRecord26StatsResponse {
  activeCount: number;
}

export function isInventoryRecord26Active(rec: InventoryRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord26Label(rec: InventoryRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord26ByPriority(a: InventoryRecord26, b: InventoryRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
