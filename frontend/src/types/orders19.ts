/** Domain types for orders / OrderRecord19 */
export type OrderRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord19Status;
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

export interface OrderRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord19ListResponse {
  items: OrderRecord19[];
  total?: number;
}

export interface OrderRecord19StatsResponse {
  activeCount: number;
}

export function isOrderRecord19Active(rec: OrderRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord19Label(rec: OrderRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord19ByPriority(a: OrderRecord19, b: OrderRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
