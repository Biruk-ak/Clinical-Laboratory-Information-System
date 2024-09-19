import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord19ByPriority,
  formatPatientRecord19Label,
  isPatientRecord19Active,
  type PatientRecord19,
} from '../types/patients19';

function make(partial: Partial<PatientRecord19> = {}): PatientRecord19 {
  return {
    id: '1',
    externalCode: 'CODE-19',
    displayName: 'Record 19',
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

describe('PatientRecord19 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord19Label(make())).toContain('CODE-19');
  });

  it('detects active records', () => {
    expect(isPatientRecord19Active(make())).toBe(true);
    expect(isPatientRecord19Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord19Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord19ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
