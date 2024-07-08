/** Domain types for inventory / InventoryRecord04 */
export type InventoryRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface InventoryRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: InventoryRecord04Status;
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

export interface InventoryRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: InventoryRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface InventoryRecord04ListResponse {
  items: InventoryRecord04[];
  total?: number;
}

export interface InventoryRecord04StatsResponse {
  activeCount: number;
}

export function isInventoryRecord04Active(rec: InventoryRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatInventoryRecord04Label(rec: InventoryRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareInventoryRecord04ByPriority(a: InventoryRecord04, b: InventoryRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
