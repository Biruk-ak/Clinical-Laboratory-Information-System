/** Domain types for inventory / InventoryRecord08 */
export type InventoryRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord08Status;
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

export interface InventoryRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord08ListResponse {
  items: InventoryRecord08[];
  total?: number;
}

export interface InventoryRecord08StatsResponse {
  activeCount: number;
}

export function isInventoryRecord08Active(rec: InventoryRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord08Label(rec: InventoryRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord08ByPriority(a: InventoryRecord08, b: InventoryRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
