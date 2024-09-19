import { describe, expect, it } from 'vitest';
import {
  compareNotificationRecord07ByPriority,
  formatNotificationRecord07Label,
  isNotificationRecord07Active,
  type NotificationRecord07,
} from '../types/notifications07';

function make(partial: Partial<NotificationRecord07> = {}): NotificationRecord07 {
  return {
    id: '1',
    externalCode: 'CODE-7',
    displayName: 'Record 7',
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

describe('NotificationRecord07 helpers', () => {
  it('formats label', () => {
    expect(formatNotificationRecord07Label(make())).toContain('CODE-7');
  });

  it('detects active records', () => {
    expect(isNotificationRecord07Active(make())).toBe(true);
    expect(isNotificationRecord07Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isNotificationRecord07Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareNotificationRecord07ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
