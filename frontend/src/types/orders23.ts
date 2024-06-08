/** Domain types for orders / OrderRecord23 */
export type OrderRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord23Status;
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

export interface OrderRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord23ListResponse {
  items: OrderRecord23[];
  total?: number;
}

export interface OrderRecord23StatsResponse {
  activeCount: number;
}

export function isOrderRecord23Active(rec: OrderRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord23Label(rec: OrderRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord23ByPriority(a: OrderRecord23, b: OrderRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
