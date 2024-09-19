import { describe, expect, it } from 'vitest';
import {
  compareAuthRecord04ByPriority,
  formatAuthRecord04Label,
  isAuthRecord04Active,
  type AuthRecord04,
} from '../types/auth04';

function make(partial: Partial<AuthRecord04> = {}): AuthRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('AuthRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatAuthRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isAuthRecord04Active(make())).toBe(true);
    expect(isAuthRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAuthRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAuthRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
