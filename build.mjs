import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');

const fontFiles = [
  'node_modules/@expo-google-fonts/dela-gothic-one/400Regular/DelaGothicOne_400Regular.ttf',
  'node_modules/@expo-google-fonts/noto-sans-jp/700Bold/NotoSansJP_700Bold.ttf',
];
const png = (svg, width, out) => {
  const data = new Resvg(fs.readFileSync(svg), {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Noto Sans JP' },
  }).render().asPng();
  fs.writeFileSync(`dist/${out}`, data);
};
png('icon.svg', 512, 'icon-512.png');
png('icon.svg', 512, 'icon-maskable-512.png');
png('icon.svg', 192, 'icon-192.png');
png('icon.svg', 180, 'apple-touch-icon.png');
png('icon.svg', 32, 'favicon-32.png');
png('og.svg', 1200, 'og.png');

for (const f of ['icon.svg', 'manifest.webmanifest', 'sw.js']) fs.copyFileSync(f, `dist/${f}`);

const anchor = '<meta name="theme-color" content="#13141c">';
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes(anchor)) throw new Error('head anchor not found in index.html');
html = html.replace(anchor, fs.readFileSync('head.html', 'utf8').trim());
html = html.replace('</body>', `<script>if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));}</script>\n</body>`);
fs.writeFileSync('dist/index.html', html);
console.log('built', fs.readdirSync('dist').join(', '));
