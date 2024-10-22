import { describe, expect, it } from 'vitest';
import {
  accessionLabel34,
  clampPriority34,
  formatPercent34,
  formatTAT34,
} from './formatters34';

describe('formatters34', () => {
  it('formats percent', () => {
    expect(formatPercent34(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT34(45)).toBe('45m');
    expect(formatTAT34(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority34(-5)).toBe(0);
    expect(clampPriority34(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel34(2024, 42)).toContain('2024');
  });
});
