/** Domain types for orders / OrderRecord11 */
export type OrderRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord11Status;
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

export interface OrderRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord11ListResponse {
  items: OrderRecord11[];
  total?: number;
}

export interface OrderRecord11StatsResponse {
  activeCount: number;
}

export function isOrderRecord11Active(rec: OrderRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord11Label(rec: OrderRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord11ByPriority(a: OrderRecord11, b: OrderRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
