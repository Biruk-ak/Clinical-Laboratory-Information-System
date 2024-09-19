import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord04ByPriority,
  formatLabTestRecord04Label,
  isLabTestRecord04Active,
  type LabTestRecord04,
} from '../types/tests04';

function make(partial: Partial<LabTestRecord04> = {}): LabTestRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('LabTestRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isLabTestRecord04Active(make())).toBe(true);
    expect(isLabTestRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
