/** Domain types for orders / OrderRecord08 */
export type OrderRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord08Status;
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

export interface OrderRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord08ListResponse {
  items: OrderRecord08[];
  total?: number;
}

export interface OrderRecord08StatsResponse {
  activeCount: number;
}

export function isOrderRecord08Active(rec: OrderRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord08Label(rec: OrderRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord08ByPriority(a: OrderRecord08, b: OrderRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
