/** Domain types for inventory / InventoryRecord05 */
export type InventoryRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord05Status;
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

export interface InventoryRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord05ListResponse {
  items: InventoryRecord05[];
  total?: number;
}

export interface InventoryRecord05StatsResponse {
  activeCount: number;
}

export function isInventoryRecord05Active(rec: InventoryRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord05Label(rec: InventoryRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord05ByPriority(a: InventoryRecord05, b: InventoryRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
