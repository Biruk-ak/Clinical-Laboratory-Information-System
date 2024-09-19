import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord25ByPriority,
  formatSampleRecord25Label,
  isSampleRecord25Active,
  type SampleRecord25,
} from '../types/samples25';

function make(partial: Partial<SampleRecord25> = {}): SampleRecord25 {
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

describe('SampleRecord25 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord25Label(make())).toContain('CODE-25');
  });

  it('detects active records', () => {
    expect(isSampleRecord25Active(make())).toBe(true);
    expect(isSampleRecord25Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord25Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord25ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
