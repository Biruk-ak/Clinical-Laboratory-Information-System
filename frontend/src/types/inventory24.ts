/** Domain types for inventory / InventoryRecord24 */
export type InventoryRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord24Status;
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

export interface InventoryRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord24ListResponse {
  items: InventoryRecord24[];
  total?: number;
}

export interface InventoryRecord24StatsResponse {
  activeCount: number;
}

export function isInventoryRecord24Active(rec: InventoryRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord24Label(rec: InventoryRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord24ByPriority(a: InventoryRecord24, b: InventoryRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
