/** Domain types for qualitycontrol / QualityControlRecord22 */
export type QualityControlRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord22Status;
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

export interface QualityControlRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord22ListResponse {
  items: QualityControlRecord22[];
  total?: number;
}

export interface QualityControlRecord22StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord22Active(rec: QualityControlRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord22Label(rec: QualityControlRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord22ByPriority(a: QualityControlRecord22, b: QualityControlRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
