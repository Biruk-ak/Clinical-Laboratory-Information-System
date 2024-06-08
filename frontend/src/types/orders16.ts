/** Domain types for orders / OrderRecord16 */
export type OrderRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord16Status;
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

export interface OrderRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord16ListResponse {
  items: OrderRecord16[];
  total?: number;
}

export interface OrderRecord16StatsResponse {
  activeCount: number;
}

export function isOrderRecord16Active(rec: OrderRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord16Label(rec: OrderRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord16ByPriority(a: OrderRecord16, b: OrderRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
