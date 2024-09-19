import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord28ByPriority,
  formatDoctorRecord28Label,
  isDoctorRecord28Active,
  type DoctorRecord28,
} from '../types/doctors28';

function make(partial: Partial<DoctorRecord28> = {}): DoctorRecord28 {
  return {
    id: '1',
    externalCode: 'CODE-28',
    displayName: 'Record 28',
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

describe('DoctorRecord28 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord28Label(make())).toContain('CODE-28');
  });

  it('detects active records', () => {
    expect(isDoctorRecord28Active(make())).toBe(true);
    expect(isDoctorRecord28Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord28Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord28ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
