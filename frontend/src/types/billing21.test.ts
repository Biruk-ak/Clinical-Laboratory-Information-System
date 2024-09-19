import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord21ByPriority,
  formatBillingRecord21Label,
  isBillingRecord21Active,
  type BillingRecord21,
} from '../types/billing21';

function make(partial: Partial<BillingRecord21> = {}): BillingRecord21 {
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

describe('BillingRecord21 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord21Label(make())).toContain('CODE-21');
  });

  it('detects active records', () => {
    expect(isBillingRecord21Active(make())).toBe(true);
    expect(isBillingRecord21Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord21Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord21ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
