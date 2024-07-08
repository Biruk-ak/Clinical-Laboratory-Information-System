/** Domain types for notifications / NotificationRecord05 */
export type NotificationRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord05Status;
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

export interface NotificationRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord05ListResponse {
  items: NotificationRecord05[];
  total?: number;
}

export interface NotificationRecord05StatsResponse {
  activeCount: number;
}

export function isNotificationRecord05Active(rec: NotificationRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord05Label(rec: NotificationRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord05ByPriority(a: NotificationRecord05, b: NotificationRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
