import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord27ByPriority,
  formatLabTestRecord27Label,
  isLabTestRecord27Active,
  type LabTestRecord27,
} from '../types/tests27';

function make(partial: Partial<LabTestRecord27> = {}): LabTestRecord27 {
  return {
    id: '1',
    externalCode: 'CODE-27',
    displayName: 'Record 27',
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

describe('LabTestRecord27 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord27Label(make())).toContain('CODE-27');
  });

  it('detects active records', () => {
    expect(isLabTestRecord27Active(make())).toBe(true);
    expect(isLabTestRecord27Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord27Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord27ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
