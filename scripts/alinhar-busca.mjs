import sharp from 'sharp';
const AW = 1263, AH = 1034;
async function grad(buf, w, h) {
  const g = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x;
    const gx = buf[i + 1] - buf[i - 1], gy = buf[i + w] - buf[i - w];
    g[i] = Math.hypot(gx, gy);
  }
  return g;
}
function ncc(a, b) {
  let ma = 0, mb = 0; for (let i = 0; i < a.length; i++) { ma += a[i]; mb += b[i]; }
  ma /= a.length; mb /= b.length;
  let n = 0, da = 0, db = 0;
  for (let i = 0; i < a.length; i++) { const x = a[i] - ma, y = b[i] - mb; n += x * y; da += x * x; db += y * y; }
  return n / Math.sqrt(da * db);
}
const TW = 160, TH = Math.round(TW * AH / AW);
const t = await sharp('_originais/aos57.jpg').resize(TW, TH).greyscale().normalise().raw().toBuffer();
const Gt = await grad(t, TW, TH);
const big = sharp('_originais/foto1896.jpg');
let best = { s: -2 };
for (let w = 1560; w <= 1650; w += 8) {
  const h = Math.round(w * AH / AW);
  for (let x = 20; x <= 80; x += 6) for (let y = 90; y <= 170; y += 6) {
    const c = await big.clone().extract({ left: x, top: y, width: w, height: h }).resize(TW, TH).greyscale().normalise().raw().toBuffer();
    const s = ncc(Gt, await grad(c, TW, TH));
    if (s > best.s) best = { s, x, y, w, h };
  }
}
console.log('coarse', best);
let b2 = { ...best };
for (let w = best.w - 12; w <= best.w + 8; w += 2) {
  const h = Math.round(w * AH / AW);
  for (let x = best.x - 5; x <= best.x + 5; x += 1) for (let y = best.y - 5; y <= best.y + 5; y += 1) {
    if (x < 0 || y < 0 || x + w > 1744 || y + h > 2152) continue;
    const c = await big.clone().extract({ left: x, top: y, width: w, height: h }).resize(TW, TH).greyscale().normalise().raw().toBuffer();
    const s = ncc(Gt, await grad(c, TW, TH));
    if (s > b2.s) b2 = { s, x, y, w, h };
  }
}
console.log('fine', b2);
