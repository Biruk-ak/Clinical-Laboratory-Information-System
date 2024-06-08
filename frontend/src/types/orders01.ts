/** Domain types for orders / OrderRecord01 */
export type OrderRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord01Status;
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

export interface OrderRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord01ListResponse {
  items: OrderRecord01[];
  total?: number;
}

export interface OrderRecord01StatsResponse {
  activeCount: number;
}

export function isOrderRecord01Active(rec: OrderRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord01Label(rec: OrderRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord01ByPriority(a: OrderRecord01, b: OrderRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
