// Generates the Android launcher icons (square + round) for every mipmap density.
// Needs the SVG renderer once: npm install --no-save @resvg/resvg-js
// Usage: node scripts/makeAppIcon.js android/app/src/main/res src/assets/fonts/Poppins-Bold.ttf
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const [, , resDir, fontFile] = process.argv;

const art = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2F7BEA"/>
      <stop offset="1" stop-color="#1458C4"/>
    </linearGradient>
  </defs>
  <circle cx="405" cy="120" r="60" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="95" cy="430" r="80" fill="#FFFFFF" opacity="0.06"/>
  <!-- steam -->
  <path d="M200 178 q-18 -28 0 -56 q18 -28 0 -56" stroke="#FFFFFF" stroke-width="20" fill="none" stroke-linecap="round" opacity="0.9"/>
  <path d="M256 168 q-18 -28 0 -56 q18 -28 0 -56" stroke="#FFFFFF" stroke-width="20" fill="none" stroke-linecap="round" opacity="0.9"/>
  <path d="M312 178 q-18 -28 0 -56 q18 -28 0 -56" stroke="#FFFFFF" stroke-width="20" fill="none" stroke-linecap="round" opacity="0.9"/>
  <!-- food mound -->
  <path d="M128 262 C 140 200, 372 200, 384 262 Z" fill="#F75938"/>
  <circle cx="200" cy="236" r="10" fill="#FFC93C"/>
  <circle cx="262" cy="222" r="10" fill="#FFC93C"/>
  <circle cx="318" cy="240" r="10" fill="#FFC93C"/>
  <!-- bowl -->
  <path d="M104 258 h304 a152 140 0 0 1 -304 0 Z" fill="#FFFFFF"/>
  <rect x="196" y="394" width="120" height="22" rx="11" fill="#FFFFFF"/>`;

const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect x="0" y="0" width="512" height="512" rx="112" fill="url(#bg)"/>${art}</svg>`;
const round = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="256" fill="url(#bg)"/>${art}</svg>`;

const sizes = { 'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96, 'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192 };
const render = (svg, width) => new Resvg(svg, {
  fitTo: { mode: 'width', value: width },
  font: { fontFiles: [fontFile], loadSystemFonts: false, defaultFontFamily: 'Poppins' },
}).render().asPng();

for (const [dir, size] of Object.entries(sizes)) {
  fs.writeFileSync(path.join(resDir, dir, 'ic_launcher.png'), render(square, size));
  fs.writeFileSync(path.join(resDir, dir, 'ic_launcher_round.png'), render(round, size));
}
console.log('icons written');
