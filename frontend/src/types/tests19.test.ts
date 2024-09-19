import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord19ByPriority,
  formatLabTestRecord19Label,
  isLabTestRecord19Active,
  type LabTestRecord19,
} from '../types/tests19';

function make(partial: Partial<LabTestRecord19> = {}): LabTestRecord19 {
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

describe('LabTestRecord19 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord19Label(make())).toContain('CODE-19');
  });

  it('detects active records', () => {
    expect(isLabTestRecord19Active(make())).toBe(true);
    expect(isLabTestRecord19Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord19Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord19ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
