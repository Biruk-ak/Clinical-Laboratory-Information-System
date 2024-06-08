/** Domain types for orders / OrderRecord24 */
export type OrderRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface OrderRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: OrderRecord24Status;
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

export interface OrderRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: OrderRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface OrderRecord24ListResponse {
  items: OrderRecord24[];
  total?: number;
}

export interface OrderRecord24StatsResponse {
  activeCount: number;
}

export function isOrderRecord24Active(rec: OrderRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatOrderRecord24Label(rec: OrderRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareOrderRecord24ByPriority(a: OrderRecord24, b: OrderRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
