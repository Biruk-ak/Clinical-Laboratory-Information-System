import { describe, expect, it } from 'vitest';
import {
  accessionLabel06,
  clampPriority06,
  formatPercent06,
  formatTAT06,
} from './formatters06';

describe('formatters06', () => {
  it('formats percent', () => {
    expect(formatPercent06(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT06(45)).toBe('45m');
    expect(formatTAT06(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority06(-5)).toBe(0);
    expect(clampPriority06(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel06(2024, 42)).toContain('2024');
  });
});
