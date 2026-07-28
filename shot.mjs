import { chromium } from 'playwright';
const b = await chromium.launch();
const shots = [
  { name: 'desktop-dark', w: 1440, h: 2400, dark: true },
  { name: 'mobile-dark',  w: 390,  h: 1800, dark: true },
];
for (const s of shots) {
  const p = await b.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  await p.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `/tmp/${s.name}.png`, fullPage: false });
  // scroll to project section
  await p.evaluate(() => document.querySelector('#research')?.scrollIntoView());
  await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/${s.name}-proj.png` });
  const errs = [];
  p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  console.log(s.name, 'ok', errs.length ? errs : '');
  await p.close();
}
await b.close();
