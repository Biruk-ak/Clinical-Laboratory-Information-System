/** Domain types for notifications / NotificationRecord14 */
export type NotificationRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord14Status;
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

export interface NotificationRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord14ListResponse {
  items: NotificationRecord14[];
  total?: number;
}

export interface NotificationRecord14StatsResponse {
  activeCount: number;
}

export function isNotificationRecord14Active(rec: NotificationRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord14Label(rec: NotificationRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord14ByPriority(a: NotificationRecord14, b: NotificationRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
