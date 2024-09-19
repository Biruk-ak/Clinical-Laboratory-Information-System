import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord15ByPriority,
  formatSampleRecord15Label,
  isSampleRecord15Active,
  type SampleRecord15,
} from '../types/samples15';

function make(partial: Partial<SampleRecord15> = {}): SampleRecord15 {
  return {
    id: '1',
    externalCode: 'CODE-15',
    displayName: 'Record 15',
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

describe('SampleRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isSampleRecord15Active(make())).toBe(true);
    expect(isSampleRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
