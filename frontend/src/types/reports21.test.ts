import { describe, expect, it } from 'vitest';
import {
  compareReportRecord21ByPriority,
  formatReportRecord21Label,
  isReportRecord21Active,
  type ReportRecord21,
} from '../types/reports21';

function make(partial: Partial<ReportRecord21> = {}): ReportRecord21 {
  return {
    id: '1',
    externalCode: 'CODE-21',
    displayName: 'Record 21',
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

describe('ReportRecord21 helpers', () => {
  it('formats label', () => {
    expect(formatReportRecord21Label(make())).toContain('CODE-21');
  });

  it('detects active records', () => {
    expect(isReportRecord21Active(make())).toBe(true);
    expect(isReportRecord21Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isReportRecord21Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareReportRecord21ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
