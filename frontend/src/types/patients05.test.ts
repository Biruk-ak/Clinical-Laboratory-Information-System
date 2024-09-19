import { describe, expect, it } from 'vitest';
import {
  comparePatientRecord05ByPriority,
  formatPatientRecord05Label,
  isPatientRecord05Active,
  type PatientRecord05,
} from '../types/patients05';

function make(partial: Partial<PatientRecord05> = {}): PatientRecord05 {
  return {
    id: '1',
    externalCode: 'CODE-5',
    displayName: 'Record 5',
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

describe('PatientRecord05 helpers', () => {
  it('formats label', () => {
    expect(formatPatientRecord05Label(make())).toContain('CODE-5');
  });

  it('detects active records', () => {
    expect(isPatientRecord05Active(make())).toBe(true);
    expect(isPatientRecord05Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isPatientRecord05Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(comparePatientRecord05ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
