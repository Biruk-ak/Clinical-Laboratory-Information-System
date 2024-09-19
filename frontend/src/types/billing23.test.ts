import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord23ByPriority,
  formatBillingRecord23Label,
  isBillingRecord23Active,
  type BillingRecord23,
} from '../types/billing23';

function make(partial: Partial<BillingRecord23> = {}): BillingRecord23 {
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

describe('BillingRecord23 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord23Label(make())).toContain('CODE-23');
  });

  it('detects active records', () => {
    expect(isBillingRecord23Active(make())).toBe(true);
    expect(isBillingRecord23Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord23Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord23ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
