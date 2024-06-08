/** Domain types for orders / OrderRecord13 */
export type OrderRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord13Status;
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

export interface OrderRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord13ListResponse {
  items: OrderRecord13[];
  total?: number;
}

export interface OrderRecord13StatsResponse {
  activeCount: number;
}

export function isOrderRecord13Active(rec: OrderRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord13Label(rec: OrderRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord13ByPriority(a: OrderRecord13, b: OrderRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
