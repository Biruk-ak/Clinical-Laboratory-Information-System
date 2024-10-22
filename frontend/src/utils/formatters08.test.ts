import { describe, expect, it } from 'vitest';
import {
  accessionLabel08,
  clampPriority08,
  formatPercent08,
  formatTAT08,
} from './formatters08';

describe('formatters08', () => {
  it('formats percent', () => {
    expect(formatPercent08(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT08(45)).toBe('45m');
    expect(formatTAT08(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority08(-5)).toBe(0);
    expect(clampPriority08(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel08(2024, 42)).toContain('2024');
  });
});
