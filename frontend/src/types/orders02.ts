/** Domain types for orders / OrderRecord02 */
export type OrderRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord02Status;
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

export interface OrderRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord02ListResponse {
  items: OrderRecord02[];
  total?: number;
}

export interface OrderRecord02StatsResponse {
  activeCount: number;
}

export function isOrderRecord02Active(rec: OrderRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord02Label(rec: OrderRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord02ByPriority(a: OrderRecord02, b: OrderRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
