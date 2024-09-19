import { describe, expect, it } from 'vitest';
import {
  compareResultRecord22ByPriority,
  formatResultRecord22Label,
  isResultRecord22Active,
  type ResultRecord22,
} from '../types/results22';

function make(partial: Partial<ResultRecord22> = {}): ResultRecord22 {
  return {
    id: '1',
    externalCode: 'CODE-22',
    displayName: 'Record 22',
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

describe('ResultRecord22 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord22Label(make())).toContain('CODE-22');
  });

  it('detects active records', () => {
    expect(isResultRecord22Active(make())).toBe(true);
    expect(isResultRecord22Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord22Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord22ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
