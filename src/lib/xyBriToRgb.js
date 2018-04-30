export default (x, y) => {
  const z = 1.0 - x - y;
  const Y = 1; // Brightness of lamp, doesn't effect the color
  const X = Y / y * x;
  const Z = Y / y * z;

  let r = X * 1.612 - Y * 0.203 - Z * 0.302;
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  let b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * r ** (1.0 / 2.4) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * g ** (1.0 / 2.4) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * b ** (1.0 / 2.4) - 0.055;

  const maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r *= 255;
  if (r < 0) {
    r = 255;
  }

  g *= 255;
  if (g < 0) {
    g = 255;
  }

  b *= 255;
  if (b < 0) {
    b = 255;
  }

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
};
