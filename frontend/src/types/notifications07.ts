/** Domain types for notifications / NotificationRecord07 */
export type NotificationRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord07Status;
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

export interface NotificationRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord07ListResponse {
  items: NotificationRecord07[];
  total?: number;
}

export interface NotificationRecord07StatsResponse {
  activeCount: number;
}

export function isNotificationRecord07Active(rec: NotificationRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord07Label(rec: NotificationRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord07ByPriority(a: NotificationRecord07, b: NotificationRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
