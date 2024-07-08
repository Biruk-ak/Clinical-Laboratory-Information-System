/** Domain types for inventory / InventoryRecord25 */
export type InventoryRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord25Status;
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

export interface InventoryRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord25ListResponse {
  items: InventoryRecord25[];
  total?: number;
}

export interface InventoryRecord25StatsResponse {
  activeCount: number;
}

export function isInventoryRecord25Active(rec: InventoryRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord25Label(rec: InventoryRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord25ByPriority(a: InventoryRecord25, b: InventoryRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
