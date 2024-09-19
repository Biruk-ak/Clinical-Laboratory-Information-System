import { describe, expect, it } from 'vitest';
import {
  compareNotificationRecord09ByPriority,
  formatNotificationRecord09Label,
  isNotificationRecord09Active,
  type NotificationRecord09,
} from '../types/notifications09';

function make(partial: Partial<NotificationRecord09> = {}): NotificationRecord09 {
  return {
    id: '1',
    externalCode: 'CODE-9',
    displayName: 'Record 9',
    status: 'active',
    priority: 10,
    facilityId: 'fac-1',
    createdBy: 'u1',
    updatedBy: 'u1',
    notes: '',
    metadataJson: '{}',
    version: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...partial,
  };
}

describe('NotificationRecord09 helpers', () => {
  it('formats label', () => {
    expect(formatNotificationRecord09Label(make())).toContain('CODE-9');
  });

  it('detects active records', () => {
    expect(isNotificationRecord09Active(make())).toBe(true);
    expect(isNotificationRecord09Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isNotificationRecord09Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareNotificationRecord09ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
