import { describe, expect, it } from 'vitest';
import {
  compareNotificationRecord27ByPriority,
  formatNotificationRecord27Label,
  isNotificationRecord27Active,
  type NotificationRecord27,
} from '../types/notifications27';

function make(partial: Partial<NotificationRecord27> = {}): NotificationRecord27 {
  return {
    id: '1',
    externalCode: 'CODE-27',
    displayName: 'Record 27',
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

describe('NotificationRecord27 helpers', () => {
  it('formats label', () => {
    expect(formatNotificationRecord27Label(make())).toContain('CODE-27');
  });

  it('detects active records', () => {
    expect(isNotificationRecord27Active(make())).toBe(true);
    expect(isNotificationRecord27Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isNotificationRecord27Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareNotificationRecord27ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
