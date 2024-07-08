/** Domain types for notifications / NotificationRecord27 */
export type NotificationRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord27Status;
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

export interface NotificationRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord27ListResponse {
  items: NotificationRecord27[];
  total?: number;
}

export interface NotificationRecord27StatsResponse {
  activeCount: number;
}

export function isNotificationRecord27Active(rec: NotificationRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord27Label(rec: NotificationRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord27ByPriority(a: NotificationRecord27, b: NotificationRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
