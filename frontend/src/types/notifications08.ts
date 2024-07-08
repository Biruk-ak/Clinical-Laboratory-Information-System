/** Domain types for notifications / NotificationRecord08 */
export type NotificationRecord08Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord08 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord08Status;
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

export interface NotificationRecord08CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord08Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord08ListResponse {
  items: NotificationRecord08[];
  total?: number;
}

export interface NotificationRecord08StatsResponse {
  activeCount: number;
}

export function isNotificationRecord08Active(rec: NotificationRecord08): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord08Label(rec: NotificationRecord08): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord08ByPriority(a: NotificationRecord08, b: NotificationRecord08): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
