/** Domain types for orders / OrderRecord07 */
export type OrderRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord07Status;
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

export interface OrderRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord07ListResponse {
  items: OrderRecord07[];
  total?: number;
}

export interface OrderRecord07StatsResponse {
  activeCount: number;
}

export function isOrderRecord07Active(rec: OrderRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord07Label(rec: OrderRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord07ByPriority(a: OrderRecord07, b: OrderRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
