/** Domain types for orders / OrderRecord25 */
export type OrderRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord25Status;
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

export interface OrderRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord25ListResponse {
  items: OrderRecord25[];
  total?: number;
}

export interface OrderRecord25StatsResponse {
  activeCount: number;
}

export function isOrderRecord25Active(rec: OrderRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord25Label(rec: OrderRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord25ByPriority(a: OrderRecord25, b: OrderRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
