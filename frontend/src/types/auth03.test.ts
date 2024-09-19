import { describe, expect, it } from 'vitest';
import {
  compareAuthRecord03ByPriority,
  formatAuthRecord03Label,
  isAuthRecord03Active,
  type AuthRecord03,
} from '../types/auth03';

function make(partial: Partial<AuthRecord03> = {}): AuthRecord03 {
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

describe('AuthRecord03 helpers', () => {
  it('formats label', () => {
    expect(formatAuthRecord03Label(make())).toContain('CODE-3');
  });

  it('detects active records', () => {
    expect(isAuthRecord03Active(make())).toBe(true);
    expect(isAuthRecord03Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAuthRecord03Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAuthRecord03ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
