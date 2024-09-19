import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord17ByPriority,
  formatBillingRecord17Label,
  isBillingRecord17Active,
  type BillingRecord17,
} from '../types/billing17';

function make(partial: Partial<BillingRecord17> = {}): BillingRecord17 {
  return {
    id: '1',
    externalCode: 'CODE-17',
    displayName: 'Record 17',
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

describe('BillingRecord17 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord17Label(make())).toContain('CODE-17');
  });

  it('detects active records', () => {
    expect(isBillingRecord17Active(make())).toBe(true);
    expect(isBillingRecord17Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord17Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord17ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
