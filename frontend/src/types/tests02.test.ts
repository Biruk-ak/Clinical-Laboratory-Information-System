import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord02ByPriority,
  formatLabTestRecord02Label,
  isLabTestRecord02Active,
  type LabTestRecord02,
} from '../types/tests02';

function make(partial: Partial<LabTestRecord02> = {}): LabTestRecord02 {
  return {
    id: '1',
    externalCode: 'CODE-2',
    displayName: 'Record 2',
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

describe('LabTestRecord02 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord02Label(make())).toContain('CODE-2');
  });

  it('detects active records', () => {
    expect(isLabTestRecord02Active(make())).toBe(true);
    expect(isLabTestRecord02Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord02Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord02ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
