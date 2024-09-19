import { describe, expect, it } from 'vitest';
import {
  compareAnalyticsRecord03ByPriority,
  formatAnalyticsRecord03Label,
  isAnalyticsRecord03Active,
  type AnalyticsRecord03,
} from '../types/analytics03';

function make(partial: Partial<AnalyticsRecord03> = {}): AnalyticsRecord03 {
  return {
    id: '1',
    externalCode: 'CODE-3',
    displayName: 'Record 3',
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

describe('AnalyticsRecord03 helpers', () => {
  it('formats label', () => {
    expect(formatAnalyticsRecord03Label(make())).toContain('CODE-3');
  });

  it('detects active records', () => {
    expect(isAnalyticsRecord03Active(make())).toBe(true);
    expect(isAnalyticsRecord03Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAnalyticsRecord03Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAnalyticsRecord03ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
