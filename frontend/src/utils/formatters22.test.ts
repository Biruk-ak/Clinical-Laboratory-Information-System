import { describe, expect, it } from 'vitest';
import {
  accessionLabel22,
  clampPriority22,
  formatPercent22,
  formatTAT22,
} from './formatters22';

describe('formatters22', () => {
  it('formats percent', () => {
    expect(formatPercent22(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT22(45)).toBe('45m');
    expect(formatTAT22(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority22(-5)).toBe(0);
    expect(clampPriority22(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel22(2024, 42)).toContain('2024');
  });
});
