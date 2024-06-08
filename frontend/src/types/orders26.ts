/** Domain types for orders / OrderRecord26 */
export type OrderRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord26Status;
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

export interface OrderRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord26ListResponse {
  items: OrderRecord26[];
  total?: number;
}

export interface OrderRecord26StatsResponse {
  activeCount: number;
}

export function isOrderRecord26Active(rec: OrderRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord26Label(rec: OrderRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord26ByPriority(a: OrderRecord26, b: OrderRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
