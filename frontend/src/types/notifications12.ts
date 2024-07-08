/** Domain types for notifications / NotificationRecord12 */
export type NotificationRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord12Status;
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

export interface NotificationRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord12ListResponse {
  items: NotificationRecord12[];
  total?: number;
}

export interface NotificationRecord12StatsResponse {
  activeCount: number;
}

export function isNotificationRecord12Active(rec: NotificationRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord12Label(rec: NotificationRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord12ByPriority(a: NotificationRecord12, b: NotificationRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
