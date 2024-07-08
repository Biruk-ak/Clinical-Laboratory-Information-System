/** Domain types for notifications / NotificationRecord13 */
export type NotificationRecord13Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord13 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord13Status;
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

export interface NotificationRecord13CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord13Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord13ListResponse {
  items: NotificationRecord13[];
  total?: number;
}

export interface NotificationRecord13StatsResponse {
  activeCount: number;
}

export function isNotificationRecord13Active(rec: NotificationRecord13): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord13Label(rec: NotificationRecord13): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord13ByPriority(a: NotificationRecord13, b: NotificationRecord13): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
