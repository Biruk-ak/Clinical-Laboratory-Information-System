import { describe, expect, it } from 'vitest';
import {
  compareResultRecord08ByPriority,
  formatResultRecord08Label,
  isResultRecord08Active,
  type ResultRecord08,
} from '../types/results08';

function make(partial: Partial<ResultRecord08> = {}): ResultRecord08 {
  return {
    id: '1',
    externalCode: 'CODE-8',
    displayName: 'Record 8',
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

describe('ResultRecord08 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord08Label(make())).toContain('CODE-8');
  });

  it('detects active records', () => {
    expect(isResultRecord08Active(make())).toBe(true);
    expect(isResultRecord08Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord08Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord08ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
