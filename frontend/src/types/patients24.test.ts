import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord24ByPriority,
  formatPatientRecord24Label,
  isPatientRecord24Active,
  type PatientRecord24,
} from '../types/patients24';

function make(partial: Partial<PatientRecord24> = {}): PatientRecord24 {
  return {
    id: '1',
    externalCode: 'CODE-24',
    displayName: 'Record 24',
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

describe('PatientRecord24 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord24Label(make())).toContain('CODE-24');
  });

  it('detects active records', () => {
    expect(isPatientRecord24Active(make())).toBe(true);
    expect(isPatientRecord24Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord24Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord24ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
