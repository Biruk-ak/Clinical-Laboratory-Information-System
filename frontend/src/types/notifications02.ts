/** Domain types for notifications / NotificationRecord02 */
export type NotificationRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord02Status;
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

export interface NotificationRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord02ListResponse {
  items: NotificationRecord02[];
  total?: number;
}

export interface NotificationRecord02StatsResponse {
  activeCount: number;
}

export function isNotificationRecord02Active(rec: NotificationRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord02Label(rec: NotificationRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord02ByPriority(a: NotificationRecord02, b: NotificationRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
