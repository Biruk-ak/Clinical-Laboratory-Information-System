import { describe, expect, it } from 'vitest';
import {
  compareAuthRecord18ByPriority,
  formatAuthRecord18Label,
  isAuthRecord18Active,
  type AuthRecord18,
} from '../types/auth18';

function make(partial: Partial<AuthRecord18> = {}): AuthRecord18 {
  return {
    id: '1',
    externalCode: 'CODE-18',
    displayName: 'Record 18',
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

describe('AuthRecord18 helpers', () => {
  it('formats label', () => {
    expect(formatAuthRecord18Label(make())).toContain('CODE-18');
  });

  it('detects active records', () => {
    expect(isAuthRecord18Active(make())).toBe(true);
    expect(isAuthRecord18Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAuthRecord18Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAuthRecord18ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
