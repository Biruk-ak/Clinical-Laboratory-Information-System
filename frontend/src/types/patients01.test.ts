import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord01ByPriority,
  formatPatientRecord01Label,
  isPatientRecord01Active,
  type PatientRecord01,
} from '../types/patients01';

function make(partial: Partial<PatientRecord01> = {}): PatientRecord01 {
  return {
    id: '1',
    externalCode: 'CODE-1',
    displayName: 'Record 1',
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

describe('PatientRecord01 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord01Label(make())).toContain('CODE-1');
  });

  it('detects active records', () => {
    expect(isPatientRecord01Active(make())).toBe(true);
    expect(isPatientRecord01Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord01Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord01ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
