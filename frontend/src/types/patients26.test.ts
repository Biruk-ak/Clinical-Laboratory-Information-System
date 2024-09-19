import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord26ByPriority,
  formatPatientRecord26Label,
  isPatientRecord26Active,
  type PatientRecord26,
} from '../types/patients26';

function make(partial: Partial<PatientRecord26> = {}): PatientRecord26 {
  return {
    id: '1',
    externalCode: 'CODE-26',
    displayName: 'Record 26',
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

describe('PatientRecord26 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord26Label(make())).toContain('CODE-26');
  });

  it('detects active records', () => {
    expect(isPatientRecord26Active(make())).toBe(true);
    expect(isPatientRecord26Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord26Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord26ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
