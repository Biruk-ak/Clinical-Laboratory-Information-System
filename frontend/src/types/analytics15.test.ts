import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord15ByPriority,
  formatAnalyticsRecord15Label,
  isAnalyticsRecord15Active,
  type AnalyticsRecord15,
} from '../types/analytics15';

function make(partial: Partial<AnalyticsRecord15> = {}): AnalyticsRecord15 {
  return {
    id: '1',
    externalCode: 'CODE-15',
    displayName: 'Record 15',
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

describe('AnalyticsRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord15Active(make())).toBe(true);
    expect(isAnalyticsRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
