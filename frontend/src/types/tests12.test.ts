import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord12ByPriority,
  formatLabTestRecord12Label,
  isLabTestRecord12Active,
  type LabTestRecord12,
} from '../types/tests12';

function make(partial: Partial<LabTestRecord12> = {}): LabTestRecord12 {
  return {
    id: '1',
    externalCode: 'CODE-12',
    displayName: 'Record 12',
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

describe('LabTestRecord12 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord12Label(make())).toContain('CODE-12');
  });

  it('detects active records', () => {
    expect(isLabTestRecord12Active(make())).toBe(true);
    expect(isLabTestRecord12Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord12Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord12ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
