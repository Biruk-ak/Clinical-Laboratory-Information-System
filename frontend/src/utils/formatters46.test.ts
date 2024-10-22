import { describe, expect, it } from 'vitest';
import {
  accessionLabel46,
  clampPriority46,
  formatPercent46,
  formatTAT46,
} from './formatters46';

describe('formatters46', () => {
  it('formats percent', () => {
    expect(formatPercent46(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT46(45)).toBe('45m');
    expect(formatTAT46(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority46(-5)).toBe(0);
    expect(clampPriority46(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel46(2024, 42)).toContain('2024');
  });
});
