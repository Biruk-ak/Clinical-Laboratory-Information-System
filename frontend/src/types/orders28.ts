/** Domain types for orders / OrderRecord28 */
export type OrderRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord28Status;
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

export interface OrderRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord28ListResponse {
  items: OrderRecord28[];
  total?: number;
}

export interface OrderRecord28StatsResponse {
  activeCount: number;
}

export function isOrderRecord28Active(rec: OrderRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord28Label(rec: OrderRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord28ByPriority(a: OrderRecord28, b: OrderRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
