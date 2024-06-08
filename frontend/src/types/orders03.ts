/** Domain types for orders / OrderRecord03 */
export type OrderRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord03Status;
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

export interface OrderRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord03ListResponse {
  items: OrderRecord03[];
  total?: number;
}

export interface OrderRecord03StatsResponse {
  activeCount: number;
}

export function isOrderRecord03Active(rec: OrderRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord03Label(rec: OrderRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord03ByPriority(a: OrderRecord03, b: OrderRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
