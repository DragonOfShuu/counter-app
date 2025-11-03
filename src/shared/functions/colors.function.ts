const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, "");

    // Parse the hex string into its RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
};

const rgbToHsv = (
    r: number,
    g: number,
    b: number
): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const v = max;

    if (max === min) {
        h = 0;
        s = 0;
    } else {
        const d = max - min;
        s = d / max;

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
    };
};

const hexToHsv = (hex: string): { h: number; s: number; v: number } => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHsv(r, g, b);
};

export { hexToRgb, rgbToHsv, hexToHsv };
