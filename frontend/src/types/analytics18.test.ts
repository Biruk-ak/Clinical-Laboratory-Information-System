import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord18ByPriority,
  formatAnalyticsRecord18Label,
  isAnalyticsRecord18Active,
  type AnalyticsRecord18,
} from '../types/analytics18';

function make(partial: Partial<AnalyticsRecord18> = {}): AnalyticsRecord18 {
  return {
    id: '1',
    externalCode: 'CODE-18',
    displayName: 'Record 18',
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

describe('AnalyticsRecord18 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord18Label(make())).toContain('CODE-18');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord18Active(make())).toBe(true);
    expect(isAnalyticsRecord18Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord18Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord18ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
