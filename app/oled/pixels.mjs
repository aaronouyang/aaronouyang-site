/** Count fully opaque, exact-black pixels in decoded sRGB image data.
 * @param {Uint8ClampedArray} data
 */
export function countPixels(data) {
  let black = 0;
  let transparent = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 255) transparent++;
    else if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) black++;
  }
  return { black, transparent, total: data.length / 4 };
}

/** @param {number} black @param {number} total */
export function formatPercentage(black, total) {
  if (black === 0) return '0%';
  if (black === total) return '100%';
  const percentage = black / total * 100;
  if (percentage < 0.01) return '<0.01%';
  if (percentage > 99.99) return '>99.99%';
  return `${Number(percentage.toFixed(2))}%`;
}
