import { describe, expect, it } from 'vitest';
import {
  accessionLabel60,
  clampPriority60,
  formatPercent60,
  formatTAT60,
} from './formatters60';

describe('formatters60', () => {
  it('formats percent', () => {
    expect(formatPercent60(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT60(45)).toBe('45m');
    expect(formatTAT60(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority60(-5)).toBe(0);
    expect(clampPriority60(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel60(2024, 42)).toContain('2024');
  });
});
