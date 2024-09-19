import { describe, expect, it } from 'vitest';
import {
  compareResultRecord20ByPriority,
  formatResultRecord20Label,
  isResultRecord20Active,
  type ResultRecord20,
} from '../types/results20';

function make(partial: Partial<ResultRecord20> = {}): ResultRecord20 {
  return {
    id: '1',
    externalCode: 'CODE-20',
    displayName: 'Record 20',
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

describe('ResultRecord20 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord20Label(make())).toContain('CODE-20');
  });

  it('detects active records', () => {
    expect(isResultRecord20Active(make())).toBe(true);
    expect(isResultRecord20Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord20Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord20ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
