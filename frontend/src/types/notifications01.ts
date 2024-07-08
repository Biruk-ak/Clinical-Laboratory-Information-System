/** Domain types for notifications / NotificationRecord01 */
export type NotificationRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord01Status;
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

export interface NotificationRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord01ListResponse {
  items: NotificationRecord01[];
  total?: number;
}

export interface NotificationRecord01StatsResponse {
  activeCount: number;
}

export function isNotificationRecord01Active(rec: NotificationRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord01Label(rec: NotificationRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord01ByPriority(a: NotificationRecord01, b: NotificationRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
