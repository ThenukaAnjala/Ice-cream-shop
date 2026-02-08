const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const adjustColor = (hex: string, amount: number) => {
  const normalized = hex.replace("#", "")
  const num = parseInt(normalized, 16)
  const r = clamp((num >> 16) + 255 * amount, 0, 255)
  const g = clamp(((num >> 8) & 0xff) + 255 * amount, 0, 255)
  const b = clamp((num & 0xff) + 255 * amount, 0, 255)
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

export const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "")
  const num = parseInt(normalized, 16)
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  }
}

export const withAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
