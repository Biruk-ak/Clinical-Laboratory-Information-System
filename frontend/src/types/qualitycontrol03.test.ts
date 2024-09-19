import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord03ByPriority,
  formatQualityControlRecord03Label,
  isQualityControlRecord03Active,
  type QualityControlRecord03,
} from '../types/qualitycontrol03';

function make(partial: Partial<QualityControlRecord03> = {}): QualityControlRecord03 {
  return {
    id: '1',
    externalCode: 'CODE-3',
    displayName: 'Record 3',
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

describe('QualityControlRecord03 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord03Label(make())).toContain('CODE-3');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord03Active(make())).toBe(true);
    expect(isQualityControlRecord03Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord03Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord03ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
