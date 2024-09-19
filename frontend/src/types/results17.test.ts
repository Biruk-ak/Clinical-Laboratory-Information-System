import { describe, expect, it } from 'vitest';
import {
  compareResultRecord17ByPriority,
  formatResultRecord17Label,
  isResultRecord17Active,
  type ResultRecord17,
} from '../types/results17';

function make(partial: Partial<ResultRecord17> = {}): ResultRecord17 {
  return {
    id: '1',
    externalCode: 'CODE-17',
    displayName: 'Record 17',
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

describe('ResultRecord17 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord17Label(make())).toContain('CODE-17');
  });

  it('detects active records', () => {
    expect(isResultRecord17Active(make())).toBe(true);
    expect(isResultRecord17Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord17Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord17ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
