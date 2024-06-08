/** Domain types for orders / OrderRecord10 */
export type OrderRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord10Status;
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

export interface OrderRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord10ListResponse {
  items: OrderRecord10[];
  total?: number;
}

export interface OrderRecord10StatsResponse {
  activeCount: number;
}

export function isOrderRecord10Active(rec: OrderRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord10Label(rec: OrderRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord10ByPriority(a: OrderRecord10, b: OrderRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
