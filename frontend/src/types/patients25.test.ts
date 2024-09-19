import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord25ByPriority,
  formatPatientRecord25Label,
  isPatientRecord25Active,
  type PatientRecord25,
} from '../types/patients25';

function make(partial: Partial<PatientRecord25> = {}): PatientRecord25 {
  return {
    id: '1',
    externalCode: 'CODE-25',
    displayName: 'Record 25',
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

describe('PatientRecord25 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord25Label(make())).toContain('CODE-25');
  });

  it('detects active records', () => {
    expect(isPatientRecord25Active(make())).toBe(true);
    expect(isPatientRecord25Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord25Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord25ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
