import { describe, expect, it } from 'vitest';
import {
  compareReportRecord08ByPriority,
  formatReportRecord08Label,
  isReportRecord08Active,
  type ReportRecord08,
} from '../types/reports08';

function make(partial: Partial<ReportRecord08> = {}): ReportRecord08 {
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

describe('ReportRecord08 helpers', () => {
  it('formats label', () => {
    expect(formatReportRecord08Label(make())).toContain('CODE-8');
  });

  it('detects active records', () => {
    expect(isReportRecord08Active(make())).toBe(true);
    expect(isReportRecord08Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isReportRecord08Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareReportRecord08ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
