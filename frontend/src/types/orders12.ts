/** Domain types for orders / OrderRecord12 */
export type OrderRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord12Status;
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

export interface OrderRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord12ListResponse {
  items: OrderRecord12[];
  total?: number;
}

export interface OrderRecord12StatsResponse {
  activeCount: number;
}

export function isOrderRecord12Active(rec: OrderRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord12Label(rec: OrderRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord12ByPriority(a: OrderRecord12, b: OrderRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
