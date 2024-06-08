/** Domain types for orders / OrderRecord09 */
export type OrderRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord09Status;
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

export interface OrderRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord09ListResponse {
  items: OrderRecord09[];
  total?: number;
}

export interface OrderRecord09StatsResponse {
  activeCount: number;
}

export function isOrderRecord09Active(rec: OrderRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord09Label(rec: OrderRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord09ByPriority(a: OrderRecord09, b: OrderRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
