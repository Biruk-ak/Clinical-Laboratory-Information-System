/** Domain types for orders / OrderRecord18 */
export type OrderRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord18Status;
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

export interface OrderRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord18ListResponse {
  items: OrderRecord18[];
  total?: number;
}

export interface OrderRecord18StatsResponse {
  activeCount: number;
}

export function isOrderRecord18Active(rec: OrderRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord18Label(rec: OrderRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord18ByPriority(a: OrderRecord18, b: OrderRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
