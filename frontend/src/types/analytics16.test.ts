import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord16ByPriority,
  formatAnalyticsRecord16Label,
  isAnalyticsRecord16Active,
  type AnalyticsRecord16,
} from '../types/analytics16';

function make(partial: Partial<AnalyticsRecord16> = {}): AnalyticsRecord16 {
  return {
    id: '1',
    externalCode: 'CODE-16',
    displayName: 'Record 16',
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

describe('AnalyticsRecord16 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord16Label(make())).toContain('CODE-16');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord16Active(make())).toBe(true);
    expect(isAnalyticsRecord16Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord16Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord16ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
