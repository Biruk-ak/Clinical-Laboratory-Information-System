/** Domain types for qualitycontrol / QualityControlRecord04 */
export type QualityControlRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord04Status;
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

export interface QualityControlRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord04ListResponse {
  items: QualityControlRecord04[];
  total?: number;
}

export interface QualityControlRecord04StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord04Active(rec: QualityControlRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord04Label(rec: QualityControlRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord04ByPriority(a: QualityControlRecord04, b: QualityControlRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
