import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord07ByPriority,
  formatLabTestRecord07Label,
  isLabTestRecord07Active,
  type LabTestRecord07,
} from '../types/tests07';

function make(partial: Partial<LabTestRecord07> = {}): LabTestRecord07 {
  return {
    id: '1',
    externalCode: 'CODE-7',
    displayName: 'Record 7',
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

describe('LabTestRecord07 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord07Label(make())).toContain('CODE-7');
  });

  it('detects active records', () => {
    expect(isLabTestRecord07Active(make())).toBe(true);
    expect(isLabTestRecord07Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord07Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord07ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
