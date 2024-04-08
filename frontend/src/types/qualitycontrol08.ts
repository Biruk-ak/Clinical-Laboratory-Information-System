/** Domain types for qualitycontrol / QualityControlRecord08 */
export type QualityControlRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord08Status;
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

export interface QualityControlRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord08ListResponse {
  items: QualityControlRecord08[];
  total?: number;
}

export interface QualityControlRecord08StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord08Active(rec: QualityControlRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord08Label(rec: QualityControlRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord08ByPriority(a: QualityControlRecord08, b: QualityControlRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
