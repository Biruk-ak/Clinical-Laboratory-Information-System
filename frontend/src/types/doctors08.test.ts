import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord08ByPriority,
  formatDoctorRecord08Label,
  isDoctorRecord08Active,
  type DoctorRecord08,
} from '../types/doctors08';

function make(partial: Partial<DoctorRecord08> = {}): DoctorRecord08 {
  return {
    id: '1',
    externalCode: 'CODE-8',
    displayName: 'Record 8',
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

describe('DoctorRecord08 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord08Label(make())).toContain('CODE-8');
  });

  it('detects active records', () => {
    expect(isDoctorRecord08Active(make())).toBe(true);
    expect(isDoctorRecord08Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord08Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord08ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
