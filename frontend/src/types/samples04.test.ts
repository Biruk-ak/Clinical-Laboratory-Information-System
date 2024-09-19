import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord04ByPriority,
  formatSampleRecord04Label,
  isSampleRecord04Active,
  type SampleRecord04,
} from '../types/samples04';

function make(partial: Partial<SampleRecord04> = {}): SampleRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('SampleRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isSampleRecord04Active(make())).toBe(true);
    expect(isSampleRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
