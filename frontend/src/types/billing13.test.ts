import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord13ByPriority,
  formatBillingRecord13Label,
  isBillingRecord13Active,
  type BillingRecord13,
} from '../types/billing13';

function make(partial: Partial<BillingRecord13> = {}): BillingRecord13 {
  return {
    id: '1',
    externalCode: 'CODE-13',
    displayName: 'Record 13',
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

describe('BillingRecord13 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord13Label(make())).toContain('CODE-13');
  });

  it('detects active records', () => {
    expect(isBillingRecord13Active(make())).toBe(true);
    expect(isBillingRecord13Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord13Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord13ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
