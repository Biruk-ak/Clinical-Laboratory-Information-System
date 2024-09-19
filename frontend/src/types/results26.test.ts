import { describe, expect, it } from 'vitest';
import {
  compareResultRecord26ByPriority,
  formatResultRecord26Label,
  isResultRecord26Active,
  type ResultRecord26,
} from '../types/results26';

function make(partial: Partial<ResultRecord26> = {}): ResultRecord26 {
  return {
    id: '1',
    externalCode: 'CODE-26',
    displayName: 'Record 26',
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

describe('ResultRecord26 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord26Label(make())).toContain('CODE-26');
  });

  it('detects active records', () => {
    expect(isResultRecord26Active(make())).toBe(true);
    expect(isResultRecord26Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord26Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord26ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
