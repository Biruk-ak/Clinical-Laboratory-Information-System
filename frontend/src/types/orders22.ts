/** Domain types for orders / OrderRecord22 */
export type OrderRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord22Status;
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

export interface OrderRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord22ListResponse {
  items: OrderRecord22[];
  total?: number;
}

export interface OrderRecord22StatsResponse {
  activeCount: number;
}

export function isOrderRecord22Active(rec: OrderRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord22Label(rec: OrderRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord22ByPriority(a: OrderRecord22, b: OrderRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
