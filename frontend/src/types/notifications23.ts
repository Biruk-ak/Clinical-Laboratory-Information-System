/** Domain types for notifications / NotificationRecord23 */
export type NotificationRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord23Status;
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

export interface NotificationRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord23ListResponse {
  items: NotificationRecord23[];
  total?: number;
}

export interface NotificationRecord23StatsResponse {
  activeCount: number;
}

export function isNotificationRecord23Active(rec: NotificationRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord23Label(rec: NotificationRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord23ByPriority(a: NotificationRecord23, b: NotificationRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
