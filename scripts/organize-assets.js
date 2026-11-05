import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const assetsDir = path.resolve(publicDir, 'assets');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDir(assetsDir);

// Helper to copy file if exists
function copySafe(srcRel, destRel) {
  const src = path.resolve(rootDir, srcRel);
  const dest = path.resolve(assetsDir, destRel);
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${srcRel} -> ${destRel}`);
    return true;
  } else {
    console.warn(`File not found: ${srcRel}`);
    return false;
  }
}

// 1. Logo
const logoDir = path.resolve(rootDir, 'loader logo');
if (fs.existsSync(logoDir)) {
  const files = fs.readdirSync(logoDir);
  if (files.length > 0) {
    copySafe(path.join('loader logo', files[0]), 'logo.png');
  }
}

// 2. About Hero
const aboutDir = path.resolve(rootDir, 'about hero');
if (fs.existsSync(aboutDir)) {
  const files = fs.readdirSync(aboutDir);
  if (files.length > 0) {
    copySafe(path.join('about hero', files[0]), 'pages/about-hero.jpg');
  }
}

// 3. Contact Hero
const contactDir = path.resolve(rootDir, 'contact');
if (fs.existsSync(contactDir)) {
  const files = fs.readdirSync(contactDir);
  if (files.length > 0) {
    copySafe(path.join('contact', files[0]), 'pages/contact-hero.jpg');
  }
}

// 4. Why Choose Us
const whyDir = path.resolve(rootDir, 'why choose us page');
if (fs.existsSync(whyDir)) {
  const files = fs.readdirSync(whyDir);
  if (files.length > 0) {
    copySafe(path.join('why choose us page', files[0]), 'pages/why-choose-us.jpg');
  }
}

// 5. Hero Carousel (5 slides)
const carouselDir = path.resolve(rootDir, 'hero carousal  images');
if (fs.existsSync(carouselDir)) {
  const files = fs.readdirSync(carouselDir);
  files.forEach((file, index) => {
    copySafe(path.join('hero carousal  images', file), `hero/slide${index + 1}.jpg`);
  });
}

// 6. Homepage Signature Building renders (4 projects)
const buildingsDir = path.resolve(rootDir, 'home page building images');
if (fs.existsSync(buildingsDir)) {
  const files = fs.readdirSync(buildingsDir);
  files.forEach((file, index) => {
    copySafe(path.join('home page building images', file), `buildings/building-${index + 1}.png`);
  });
}

// 7. Glamorous Heights Kalam
copySafe('Glamorous Heights Kalam/hero/Luxury Mixed-Use Building at Sunset.png', 'projects/glamorous-heights/hero.png');

const ghExtDir = path.resolve(rootDir, 'Glamorous Heights Kalam/exterior');
if (fs.existsSync(ghExtDir)) {
  fs.readdirSync(ghExtDir).forEach((file, idx) => {
    copySafe(path.join('Glamorous Heights Kalam/exterior', file), `projects/glamorous-heights/exterior/exterior-${idx + 1}.jpg`);
  });
}

const ghIntDir = path.resolve(rootDir, 'Glamorous Heights Kalam/interior');
if (fs.existsSync(ghIntDir)) {
  fs.readdirSync(ghIntDir).forEach((file, idx) => {
    copySafe(path.join('Glamorous Heights Kalam/interior', file), `projects/glamorous-heights/interior/interior-${idx + 1}.jpg`);
  });
}

// 8. Town Garden Peshawar
copySafe('town garden peshawer/hero/Sunset Over a Modern Luxury Villa.png', 'projects/town-garden/hero.png');

const tgExtDir = path.resolve(rootDir, 'town garden peshawer/exterior');
if (fs.existsSync(tgExtDir)) {
  fs.readdirSync(tgExtDir).forEach((file, idx) => {
    copySafe(path.join('town garden peshawer/exterior', file), `projects/town-garden/exterior/exterior-${idx + 1}.jpg`);
  });
}

const tgIntDir = path.resolve(rootDir, 'town garden peshawer/interior');
if (fs.existsSync(tgIntDir)) {
  fs.readdirSync(tgIntDir).forEach((file, idx) => {
    copySafe(path.join('town garden peshawer/interior', file), `projects/town-garden/interior/interior-${idx + 1}.jpg`);
  });
}

const tgVidDir = path.resolve(rootDir, 'town garden peshawer/vedio');
if (fs.existsSync(tgVidDir)) {
  const files = fs.readdirSync(tgVidDir);
  if (files.length > 0) {
    copySafe(path.join('town garden peshawer/vedio', files[0]), 'projects/town-garden/town-garden-video.mp4');
  }
}

// 9. Kalam Cottages
copySafe('kalam cottage/hero image/Mountain Cottage at Golden Dusk.png', 'projects/kalam-cottages/hero.png');

const kcDir = path.resolve(rootDir, 'kalam cottage');
if (fs.existsSync(kcDir)) {
  fs.readdirSync(kcDir).forEach((file, idx) => {
    const full = path.join(kcDir, file);
    if (!fs.statSync(full).isDirectory()) {
      copySafe(path.join('kalam cottage', file), `projects/kalam-cottages/gallery/cottage-${idx + 1}.jpg`);
    }
  });
}

// 10. Corner Apartments Kalam
copySafe('corner apartement kalam/hero image/corner.png', 'projects/corner-apartments-kalam/hero.png');

const caExtDir = path.resolve(rootDir, 'corner apartement kalam/exterior');
if (fs.existsSync(caExtDir)) {
  fs.readdirSync(caExtDir).forEach((file, idx) => {
    copySafe(path.join('corner apartement kalam/exterior', file), `projects/corner-apartments-kalam/exterior/exterior-${idx + 1}.jpg`);
  });
}

const caIntDir = path.resolve(rootDir, 'corner apartement kalam/interior');
if (fs.existsSync(caIntDir)) {
  fs.readdirSync(caIntDir).forEach((file, idx) => {
    copySafe(path.join('corner apartement kalam/interior', file), `projects/corner-apartments-kalam/interior/interior-${idx + 1}.jpg`);
  });
}

console.log('All assets processed successfully!');

