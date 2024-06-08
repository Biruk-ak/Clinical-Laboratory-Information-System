/** Domain types for billing / BillingRecord09 */
export type BillingRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface BillingRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: BillingRecord09Status;
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

export interface BillingRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: BillingRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface BillingRecord09ListResponse {
  items: BillingRecord09[];
  total?: number;
}

export interface BillingRecord09StatsResponse {
  activeCount: number;
}

export function isBillingRecord09Active(rec: BillingRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatBillingRecord09Label(rec: BillingRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareBillingRecord09ByPriority(a: BillingRecord09, b: BillingRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
