/** Domain types for orders / OrderRecord27 */
export type OrderRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord27Status;
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

export interface OrderRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord27ListResponse {
  items: OrderRecord27[];
  total?: number;
}

export interface OrderRecord27StatsResponse {
  activeCount: number;
}

export function isOrderRecord27Active(rec: OrderRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord27Label(rec: OrderRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord27ByPriority(a: OrderRecord27, b: OrderRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
