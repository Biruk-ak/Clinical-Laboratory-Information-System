import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord17ByPriority,
  formatLabTestRecord17Label,
  isLabTestRecord17Active,
  type LabTestRecord17,
} from '../types/tests17';

function make(partial: Partial<LabTestRecord17> = {}): LabTestRecord17 {
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

describe('LabTestRecord17 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord17Label(make())).toContain('CODE-17');
  });

  it('detects active records', () => {
    expect(isLabTestRecord17Active(make())).toBe(true);
    expect(isLabTestRecord17Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord17Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord17ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
