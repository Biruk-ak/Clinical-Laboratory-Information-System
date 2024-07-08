/** Domain types for notifications / NotificationRecord24 */
export type NotificationRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord24Status;
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

export interface NotificationRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord24ListResponse {
  items: NotificationRecord24[];
  total?: number;
}

export interface NotificationRecord24StatsResponse {
  activeCount: number;
}

export function isNotificationRecord24Active(rec: NotificationRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord24Label(rec: NotificationRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord24ByPriority(a: NotificationRecord24, b: NotificationRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
