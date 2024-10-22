import { describe, expect, it } from 'vitest';
import {
  accessionLabel56,
  clampPriority56,
  formatPercent56,
  formatTAT56,
} from './formatters56';

describe('formatters56', () => {
  it('formats percent', () => {
    expect(formatPercent56(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT56(45)).toBe('45m');
    expect(formatTAT56(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority56(-5)).toBe(0);
    expect(clampPriority56(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel56(2024, 42)).toContain('2024');
  });
});
