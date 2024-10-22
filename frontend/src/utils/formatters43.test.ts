import { describe, expect, it } from 'vitest';
import {
  accessionLabel43,
  clampPriority43,
  formatPercent43,
  formatTAT43,
} from './formatters43';

describe('formatters43', () => {
  it('formats percent', () => {
    expect(formatPercent43(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT43(45)).toBe('45m');
    expect(formatTAT43(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority43(-5)).toBe(0);
    expect(clampPriority43(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel43(2024, 42)).toContain('2024');
  });
});
