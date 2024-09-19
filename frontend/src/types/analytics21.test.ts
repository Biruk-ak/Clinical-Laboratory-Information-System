import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord21ByPriority,
  formatAnalyticsRecord21Label,
  isAnalyticsRecord21Active,
  type AnalyticsRecord21,
} from '../types/analytics21';

function make(partial: Partial<AnalyticsRecord21> = {}): AnalyticsRecord21 {
  return {
    id: '1',
    externalCode: 'CODE-21',
    displayName: 'Record 21',
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

describe('AnalyticsRecord21 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord21Label(make())).toContain('CODE-21');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord21Active(make())).toBe(true);
    expect(isAnalyticsRecord21Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord21Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord21ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
