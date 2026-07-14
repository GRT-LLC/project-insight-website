/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Meridian brand (guide v1.0) ──
        // The site's working scales are remapped onto the palette: the old
        // sky/indigo/blue/purple accents all resolve to the Ateneo family
        // (gradient pairs become tonal blue, per the no-rainbow rule), the
        // gray light end becomes Magical Moonlight with Neverything ink at
        // the dark end, and amber is Sea Buckthorn — the CTA color, always
        // with ink text. Stock shades not listed are unchanged.
        sky: { 50: '#EDF4FA', 100: '#DBE9F4', 200: '#B7D3E9', 300: '#8CC0E8', 400: '#5E9DD1', 500: '#2E6FA3', 600: '#003A6C', 700: '#083258', 800: '#0B2B49', 900: '#0E2A47', 950: '#081E33' },
        blue: { 50: '#EDF4FA', 100: '#DBE9F4', 200: '#B7D3E9', 300: '#8CC0E8', 400: '#4E8FC7', 500: '#2E6FA3', 600: '#003A6C', 700: '#083258', 800: '#0B2B49', 900: '#0E2A47', 950: '#081E33' },
        indigo: { 50: '#EDF4FA', 100: '#DBE9F4', 200: '#B7D3E9', 300: '#8CC0E8', 400: '#4E8FC7', 500: '#14507F', 600: '#0B4678', 700: '#003A6C', 800: '#0B2B49', 900: '#0E2A47', 950: '#0A1F35' },
        // purple intentionally mirrors the indigo ramp — both fold into Ateneo,
        // so shared stops (e.g. .200/.300 with indigo) are deliberate, not typos.
        purple: { 50: '#EDF4FA', 100: '#DBE9F4', 200: '#B7D3E9', 300: '#8CC0E8', 400: '#4E8FC7', 500: '#14507F', 600: '#0B4678', 700: '#003A6C', 800: '#0B2B49', 900: '#0E2A47', 950: '#0A1F35' },
        amber: { 300: '#FFCC85', 400: '#FFBF65', 500: '#F0A94D', 600: '#C98A2E', 700: '#9A5B00' },
        gray: { 50: '#F0EEEB', 100: '#E8E4DE', 200: '#DAD5CD', 300: '#C7C1B8', 400: '#8E9AA4', 500: '#5C6B77', 600: '#4A5560', 700: '#3A444C', 800: '#262E33', 900: '#13181B', 950: '#0C1013' },
        slate: { 900: '#0E2A47', 950: '#081E33' },
        // Meridian data-set extensions (match the app's categorical colors):
        // coral = the journal's family, mauve = the dusk stop of the palette.
        coral: { 400: '#FD8973', 500: '#C94F36', 600: '#B23F2C', 700: '#8F3223' },
        mauve: { 400: '#A85D79', 500: '#8A5474', 600: '#6E4A62', 700: '#5A3C50' },
      },
    },
  },
  plugins: [],
}
