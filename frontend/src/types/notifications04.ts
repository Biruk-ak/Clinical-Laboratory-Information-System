/** Domain types for notifications / NotificationRecord04 */
export type NotificationRecord04Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord04 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord04Status;
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

export interface NotificationRecord04CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord04Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord04ListResponse {
  items: NotificationRecord04[];
  total?: number;
}

export interface NotificationRecord04StatsResponse {
  activeCount: number;
}

export function isNotificationRecord04Active(rec: NotificationRecord04): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord04Label(rec: NotificationRecord04): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord04ByPriority(a: NotificationRecord04, b: NotificationRecord04): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
