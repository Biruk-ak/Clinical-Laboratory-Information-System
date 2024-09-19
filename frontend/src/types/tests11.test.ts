import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord11ByPriority,
  formatLabTestRecord11Label,
  isLabTestRecord11Active,
  type LabTestRecord11,
} from '../types/tests11';

function make(partial: Partial<LabTestRecord11> = {}): LabTestRecord11 {
  return {
    id: '1',
    externalCode: 'CODE-11',
    displayName: 'Record 11',
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

describe('LabTestRecord11 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord11Label(make())).toContain('CODE-11');
  });

  it('detects active records', () => {
    expect(isLabTestRecord11Active(make())).toBe(true);
    expect(isLabTestRecord11Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord11Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord11ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
