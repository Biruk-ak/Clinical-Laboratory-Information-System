/** Domain types for orders / OrderRecord17 */
export type OrderRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord17Status;
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

export interface OrderRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord17ListResponse {
  items: OrderRecord17[];
  total?: number;
}

export interface OrderRecord17StatsResponse {
  activeCount: number;
}

export function isOrderRecord17Active(rec: OrderRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord17Label(rec: OrderRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord17ByPriority(a: OrderRecord17, b: OrderRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
