/** Domain types for notifications / NotificationRecord10 */
export type NotificationRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord10Status;
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

export interface NotificationRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord10ListResponse {
  items: NotificationRecord10[];
  total?: number;
}

export interface NotificationRecord10StatsResponse {
  activeCount: number;
}

export function isNotificationRecord10Active(rec: NotificationRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord10Label(rec: NotificationRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord10ByPriority(a: NotificationRecord10, b: NotificationRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
