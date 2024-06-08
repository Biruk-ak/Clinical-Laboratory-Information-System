/** Domain types for orders / OrderRecord06 */
export type OrderRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord06Status;
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

export interface OrderRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord06ListResponse {
  items: OrderRecord06[];
  total?: number;
}

export interface OrderRecord06StatsResponse {
  activeCount: number;
}

export function isOrderRecord06Active(rec: OrderRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord06Label(rec: OrderRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord06ByPriority(a: OrderRecord06, b: OrderRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
