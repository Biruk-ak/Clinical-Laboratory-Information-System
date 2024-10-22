import { describe, expect, it } from 'vitest';
import {
  accessionLabel16,
  clampPriority16,
  formatPercent16,
  formatTAT16,
} from './formatters16';

describe('formatters16', () => {
  it('formats percent', () => {
    expect(formatPercent16(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT16(45)).toBe('45m');
    expect(formatTAT16(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority16(-5)).toBe(0);
    expect(clampPriority16(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel16(2024, 42)).toContain('2024');
  });
});
