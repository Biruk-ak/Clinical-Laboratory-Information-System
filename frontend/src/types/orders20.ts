/** Domain types for orders / OrderRecord20 */
export type OrderRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord20Status;
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

export interface OrderRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord20ListResponse {
  items: OrderRecord20[];
  total?: number;
}

export interface OrderRecord20StatsResponse {
  activeCount: number;
}

export function isOrderRecord20Active(rec: OrderRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord20Label(rec: OrderRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord20ByPriority(a: OrderRecord20, b: OrderRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
