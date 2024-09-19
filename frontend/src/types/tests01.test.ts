import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord01ByPriority,
  formatLabTestRecord01Label,
  isLabTestRecord01Active,
  type LabTestRecord01,
} from '../types/tests01';

function make(partial: Partial<LabTestRecord01> = {}): LabTestRecord01 {
  return {
    id: '1',
    externalCode: 'CODE-1',
    displayName: 'Record 1',
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

describe('LabTestRecord01 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord01Label(make())).toContain('CODE-1');
  });

  it('detects active records', () => {
    expect(isLabTestRecord01Active(make())).toBe(true);
    expect(isLabTestRecord01Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord01Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord01ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
