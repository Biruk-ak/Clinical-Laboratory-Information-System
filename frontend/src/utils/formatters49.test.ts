import { describe, expect, it } from 'vitest';
import {
  accessionLabel49,
  clampPriority49,
  formatPercent49,
  formatTAT49,
} from './formatters49';

describe('formatters49', () => {
  it('formats percent', () => {
    expect(formatPercent49(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT49(45)).toBe('45m');
    expect(formatTAT49(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority49(-5)).toBe(0);
    expect(clampPriority49(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel49(2024, 42)).toContain('2024');
  });
});
