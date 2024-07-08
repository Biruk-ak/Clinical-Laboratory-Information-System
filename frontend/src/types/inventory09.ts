/** Domain types for inventory / InventoryRecord09 */
export type InventoryRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord09Status;
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

export interface InventoryRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord09ListResponse {
  items: InventoryRecord09[];
  total?: number;
}

export interface InventoryRecord09StatsResponse {
  activeCount: number;
}

export function isInventoryRecord09Active(rec: InventoryRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord09Label(rec: InventoryRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord09ByPriority(a: InventoryRecord09, b: InventoryRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
