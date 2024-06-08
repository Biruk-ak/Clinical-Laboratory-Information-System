/** Domain types for orders / OrderRecord21 */
export type OrderRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord21Status;
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

export interface OrderRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord21ListResponse {
  items: OrderRecord21[];
  total?: number;
}

export interface OrderRecord21StatsResponse {
  activeCount: number;
}

export function isOrderRecord21Active(rec: OrderRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord21Label(rec: OrderRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord21ByPriority(a: OrderRecord21, b: OrderRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
