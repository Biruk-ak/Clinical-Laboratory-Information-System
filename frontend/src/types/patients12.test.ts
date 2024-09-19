import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord12ByPriority,
  formatPatientRecord12Label,
  isPatientRecord12Active,
  type PatientRecord12,
} from '../types/patients12';

function make(partial: Partial<PatientRecord12> = {}): PatientRecord12 {
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

describe('PatientRecord12 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord12Label(make())).toContain('CODE-12');
  });

  it('detects active records', () => {
    expect(isPatientRecord12Active(make())).toBe(true);
    expect(isPatientRecord12Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord12Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord12ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
