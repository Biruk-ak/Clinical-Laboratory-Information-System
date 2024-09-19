import { describe, expect, it } from 'vitest';
import {
  compareReportRecord15ByPriority,
  formatReportRecord15Label,
  isReportRecord15Active,
  type ReportRecord15,
} from '../types/reports15';

function make(partial: Partial<ReportRecord15> = {}): ReportRecord15 {
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

describe('ReportRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatReportRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isReportRecord15Active(make())).toBe(true);
    expect(isReportRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isReportRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareReportRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
