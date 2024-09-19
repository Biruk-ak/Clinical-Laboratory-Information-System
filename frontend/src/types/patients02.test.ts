import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord02ByPriority,
  formatPatientRecord02Label,
  isPatientRecord02Active,
  type PatientRecord02,
} from '../types/patients02';

function make(partial: Partial<PatientRecord02> = {}): PatientRecord02 {
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

describe('PatientRecord02 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord02Label(make())).toContain('CODE-2');
  });

  it('detects active records', () => {
    expect(isPatientRecord02Active(make())).toBe(true);
    expect(isPatientRecord02Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord02Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord02ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
