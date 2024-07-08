/** Domain types for inventory / InventoryRecord12 */
export type InventoryRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord12Status;
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

export interface InventoryRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord12ListResponse {
  items: InventoryRecord12[];
  total?: number;
}

export interface InventoryRecord12StatsResponse {
  activeCount: number;
}

export function isInventoryRecord12Active(rec: InventoryRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord12Label(rec: InventoryRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord12ByPriority(a: InventoryRecord12, b: InventoryRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
