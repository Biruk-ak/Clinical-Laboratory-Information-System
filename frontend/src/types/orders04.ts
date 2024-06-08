/** Domain types for orders / OrderRecord04 */
export type OrderRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord04Status;
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

export interface OrderRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord04ListResponse {
  items: OrderRecord04[];
  total?: number;
}

export interface OrderRecord04StatsResponse {
  activeCount: number;
}

export function isOrderRecord04Active(rec: OrderRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord04Label(rec: OrderRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord04ByPriority(a: OrderRecord04, b: OrderRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
