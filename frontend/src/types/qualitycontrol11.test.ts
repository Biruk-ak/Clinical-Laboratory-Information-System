import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord11ByPriority,
  formatQualityControlRecord11Label,
  isQualityControlRecord11Active,
  type QualityControlRecord11,
} from '../types/qualitycontrol11';

function make(partial: Partial<QualityControlRecord11> = {}): QualityControlRecord11 {
  return {
    id: '1',
    externalCode: 'CODE-11',
    displayName: 'Record 11',
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

describe('QualityControlRecord11 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord11Label(make())).toContain('CODE-11');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord11Active(make())).toBe(true);
    expect(isQualityControlRecord11Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord11Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord11ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
