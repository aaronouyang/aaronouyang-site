import assert from 'node:assert/strict';
import test from 'node:test';
import { countPixels, formatPercentage } from './pixels.mjs';

test('counts exact black, excluding near-black and transparency', () => {
  const pixels = new Uint8ClampedArray([
    0, 0, 0, 255, 1, 0, 0, 255, 0, 1, 0, 255, 0, 0, 1, 255,
    255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 254, 0, 0, 0, 255,
  ]);
  assert.deepEqual(countPixels(pixels), { black: 2, transparent: 2, total: 8 });
});

test('handles all-black and all-white images', () => {
  assert.deepEqual(countPixels(new Uint8ClampedArray([0, 0, 0, 255])), { black: 1, transparent: 0, total: 1 });
  assert.deepEqual(countPixels(new Uint8ClampedArray([255, 255, 255, 255])), { black: 0, transparent: 0, total: 1 });
});

test('does not round almost-black or barely-black coverage to an endpoint', () => {
  assert.equal(formatPercentage(0, 10000), '0%');
  assert.equal(formatPercentage(10000, 10000), '100%');
  assert.equal(formatPercentage(99999, 100000), '>99.99%');
  assert.equal(formatPercentage(1, 100000), '<0.01%');
  assert.equal(formatPercentage(1, 4), '25%');
  assert.equal(formatPercentage(1, 3), '33.33%');
});
