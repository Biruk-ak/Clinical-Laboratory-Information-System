/** Domain types for orders / OrderRecord15 */
export type OrderRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord15Status;
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

export interface OrderRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord15ListResponse {
  items: OrderRecord15[];
  total?: number;
}

export interface OrderRecord15StatsResponse {
  activeCount: number;
}

export function isOrderRecord15Active(rec: OrderRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord15Label(rec: OrderRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord15ByPriority(a: OrderRecord15, b: OrderRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
