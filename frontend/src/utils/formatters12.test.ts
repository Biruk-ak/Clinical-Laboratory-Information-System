import { describe, expect, it } from 'vitest';
import {
  accessionLabel12,
  clampPriority12,
  formatPercent12,
  formatTAT12,
} from './formatters12';

describe('formatters12', () => {
  it('formats percent', () => {
    expect(formatPercent12(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT12(45)).toBe('45m');
    expect(formatTAT12(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority12(-5)).toBe(0);
    expect(clampPriority12(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel12(2024, 42)).toContain('2024');
  });
});
