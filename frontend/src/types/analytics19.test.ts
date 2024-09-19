import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord19ByPriority,
  formatAnalyticsRecord19Label,
  isAnalyticsRecord19Active,
  type AnalyticsRecord19,
} from '../types/analytics19';

function make(partial: Partial<AnalyticsRecord19> = {}): AnalyticsRecord19 {
  return {
    id: '1',
    externalCode: 'CODE-19',
    displayName: 'Record 19',
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

describe('AnalyticsRecord19 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord19Label(make())).toContain('CODE-19');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord19Active(make())).toBe(true);
    expect(isAnalyticsRecord19Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord19Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord19ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
