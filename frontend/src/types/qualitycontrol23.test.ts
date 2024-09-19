import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord23ByPriority,
  formatQualityControlRecord23Label,
  isQualityControlRecord23Active,
  type QualityControlRecord23,
} from '../types/qualitycontrol23';

function make(partial: Partial<QualityControlRecord23> = {}): QualityControlRecord23 {
  return {
    id: '1',
    externalCode: 'CODE-23',
    displayName: 'Record 23',
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

describe('QualityControlRecord23 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord23Label(make())).toContain('CODE-23');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord23Active(make())).toBe(true);
    expect(isQualityControlRecord23Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord23Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord23ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
