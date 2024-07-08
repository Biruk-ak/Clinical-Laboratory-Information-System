/** Domain types for notifications / NotificationRecord17 */
export type NotificationRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord17Status;
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

export interface NotificationRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord17ListResponse {
  items: NotificationRecord17[];
  total?: number;
}

export interface NotificationRecord17StatsResponse {
  activeCount: number;
}

export function isNotificationRecord17Active(rec: NotificationRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord17Label(rec: NotificationRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord17ByPriority(a: NotificationRecord17, b: NotificationRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
