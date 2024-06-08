/** Domain types for orders / OrderRecord05 */
export type OrderRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord05Status;
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

export interface OrderRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord05ListResponse {
  items: OrderRecord05[];
  total?: number;
}

export interface OrderRecord05StatsResponse {
  activeCount: number;
}

export function isOrderRecord05Active(rec: OrderRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord05Label(rec: OrderRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord05ByPriority(a: OrderRecord05, b: OrderRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
