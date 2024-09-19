import { describe, expect, it } from 'vitest';
import {
  compareResultRecord28ByPriority,
  formatResultRecord28Label,
  isResultRecord28Active,
  type ResultRecord28,
} from '../types/results28';

function make(partial: Partial<ResultRecord28> = {}): ResultRecord28 {
  return {
    id: '1',
    externalCode: 'CODE-28',
    displayName: 'Record 28',
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

describe('ResultRecord28 helpers', () => {
  it('formats label', () => {
    expect(formatResultRecord28Label(make())).toContain('CODE-28');
  });

  it('detects active records', () => {
    expect(isResultRecord28Active(make())).toBe(true);
    expect(isResultRecord28Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isResultRecord28Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareResultRecord28ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
