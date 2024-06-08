/** Domain types for orders / OrderRecord14 */
export type OrderRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord14Status;
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

export interface OrderRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord14ListResponse {
  items: OrderRecord14[];
  total?: number;
}

export interface OrderRecord14StatsResponse {
  activeCount: number;
}

export function isOrderRecord14Active(rec: OrderRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord14Label(rec: OrderRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord14ByPriority(a: OrderRecord14, b: OrderRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
