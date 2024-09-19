import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord24ByPriority,
  formatAnalyticsRecord24Label,
  isAnalyticsRecord24Active,
  type AnalyticsRecord24,
} from '../types/analytics24';

function make(partial: Partial<AnalyticsRecord24> = {}): AnalyticsRecord24 {
  return {
    id: '1',
    externalCode: 'CODE-24',
    displayName: 'Record 24',
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

describe('AnalyticsRecord24 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord24Label(make())).toContain('CODE-24');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord24Active(make())).toBe(true);
    expect(isAnalyticsRecord24Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord24Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord24ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
