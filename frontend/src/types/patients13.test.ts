import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord13ByPriority,
  formatPatientRecord13Label,
  isPatientRecord13Active,
  type PatientRecord13,
} from '../types/patients13';

function make(partial: Partial<PatientRecord13> = {}): PatientRecord13 {
  return {
    id: '1',
    externalCode: 'CODE-13',
    displayName: 'Record 13',
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

describe('PatientRecord13 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord13Label(make())).toContain('CODE-13');
  });

  it('detects active records', () => {
    expect(isPatientRecord13Active(make())).toBe(true);
    expect(isPatientRecord13Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord13Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord13ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
