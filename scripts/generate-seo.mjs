import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const TMP_BUNDLE = path.join(ROOT_DIR, '.seo-tmp-bundle.cjs');

const SITE_URL = 'https://peshawars.com';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Loads TypeScript data & SEO builders synchronously via esbuild without altering runtime sources. */
function loadProjectDataAndSchemas() {
  const entrySource = `
    export { initialProjects, initialProperties, initialBlogPosts, initialSettings } from './src/data/initialData.ts';
    export {
      SITE_URL,
      SITE_NAME,
      toAbsoluteUrl,
      buildBreadcrumbSchema,
      buildOrganizationAndWebsiteSchema,
      buildHomeFaqSchema,
      buildProjectSchema,
      buildPropertySchema,
      buildBlogSchema,
    } from './src/seo/seoConfig.ts';
  `;

  esbuild.buildSync({
    stdin: {
      contents: entrySource,
      resolveDir: ROOT_DIR,
      loader: 'ts',
    },
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: TMP_BUNDLE,
    logLevel: 'silent',
  });

  const require = createRequire(import.meta.url);
  const loaded = require(TMP_BUNDLE);
  fs.rmSync(TMP_BUNDLE, { force: true });
  return loaded;
}

function replaceOrInsertMeta(html, attr, key, content) {
  const escaped = escapeHtml(content);
  const regex = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function injectRouteSeoIntoHtml(baseHtml, routeMeta) {
  const canonicalUrl =
    routeMeta.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${routeMeta.path}`;
  const ogImage = routeMeta.imageUrl;

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(routeMeta.title)}</title>`);
  html = replaceOrInsertMeta(html, 'name', 'description', routeMeta.description);
  if (routeMeta.keywords) {
    html = replaceOrInsertMeta(html, 'name', 'keywords', routeMeta.keywords);
  }
  html = replaceOrInsertMeta(
    html,
    'name',
    'robots',
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );

  html = replaceOrInsertMeta(html, 'property', 'og:type', routeMeta.type || 'website');
  html = replaceOrInsertMeta(html, 'property', 'og:title', routeMeta.title);
  html = replaceOrInsertMeta(html, 'property', 'og:description', routeMeta.description);
  html = replaceOrInsertMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceOrInsertMeta(html, 'property', 'og:image', ogImage);

  html = replaceOrInsertMeta(html, 'name', 'twitter:title', routeMeta.title);
  html = replaceOrInsertMeta(html, 'name', 'twitter:description', routeMeta.description);
  html = replaceOrInsertMeta(html, 'name', 'twitter:image', ogImage);

  const schemas = Array.isArray(routeMeta.jsonLd)
    ? routeMeta.jsonLd
    : routeMeta.jsonLd
    ? [routeMeta.jsonLd]
    : [];
  const jsonLdScripts = schemas
    .map(
      (schema) =>
        `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(schema)}</script>`
    )
    .join('\n');

  if (jsonLdScripts) {
    html = html.replace('</head>', `${jsonLdScripts}\n  </head>`);
  }

  if (routeMeta.noscriptHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><noscript>${routeMeta.noscriptHtml}</noscript></div>`
    );
  }

  return html;
}

function main() {
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('dist/index.html not found. Run vite build before generate-seo.mjs.');
  }

  const data = loadProjectDataAndSchemas();
  const {
    initialProjects,
    initialProperties,
    initialBlogPosts,
    toAbsoluteUrl,
    buildBreadcrumbSchema,
    buildOrganizationAndWebsiteSchema,
    buildHomeFaqSchema,
    buildProjectSchema,
    buildPropertySchema,
    buildBlogSchema,
  } = data;

  const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  const today = new Date().toISOString().split('T')[0];

  const publishedProjects = initialProjects.filter((p) => p.published !== false);
  const publishedProperties = initialProperties.filter((p) => p.published !== false);
  const publishedBlogs = initialBlogPosts.filter((b) => b.published !== false);

  const routes = [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: today,
      title: 'Peshawars.com | PESHAWER REAL ESTATE — Buy, Sell & Invest in Peshawar & Kalam',
      description:
        'PESHAWER REAL ESTATE (Peshawars.com) — Verified houses, luxury villas, DHA Peshawar plots, and TMA-approved projects in University Town Peshawar & Kalam Swat with 3 to 5 year installment plans.',
      keywords:
        'Peshawar real estate, Peshawars.com, property in Peshawar, houses for sale Peshawar, University Town Peshawar villas, DHA Peshawar plots, Glamorous Heights Kalam, Town Garden Peshawar, Kalam Cottages',
      imageUrl: toAbsoluteUrl('/assets/hero/home-clean.png'),
      type: 'website',
      jsonLd: [buildOrganizationAndWebsiteSchema(), buildHomeFaqSchema()],
      noscriptHtml: `<h1>PESHAWER REAL ESTATE (Peshawars.com) — Buy, Sell & Invest in Peshawar & Kalam</h1><p>Verified houses, luxury villas, commercial plots, and TMA-approved developments including Town Garden Peshawar, Glamorous Heights Kalam, Kalam Cottages, and Corner Apartments Kalam.</p><nav><a href="/properties">Properties</a> | <a href="/projects">Projects</a> | <a href="/blogs">Blogs</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></nav>`,
    },
    {
      path: '/properties',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: today,
      title: 'Discover Premium Properties in Peshawar & Kalam | Peshawars.com',
      description:
        'Browse our curated portfolio of verified residential homes, villas, commercial units, plots, and luxury apartments across Peshawar and Kalam.',
      keywords: 'properties in Peshawar, Peshawar real estate listings, Kalam properties, Peshawars.com',
      imageUrl: toAbsoluteUrl('/assets/hero/slide4.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Discover Premium Properties', url: `${SITE_URL}/properties` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Properties', url: '/properties' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Discover Premium Properties in Peshawar & Kalam</h1><p>Verified residential and commercial listings from PESHAWER REAL ESTATE.</p>`,
    },
    {
      path: '/properties/buy',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: today,
      title: 'Properties For Sale in Peshawar & Kalam | Peshawars.com',
      description:
        'Explore verified residential homes, luxury villas, plots, and apartments available for sale in Peshawar and Kalam Swat.',
      keywords: 'houses for sale in Peshawar, apartments for sale Kalam, villas for sale University Town Peshawar',
      imageUrl: toAbsoluteUrl('/assets/hero/slide1.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Properties For Sale', url: `${SITE_URL}/properties/buy` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Properties', url: '/properties' },
            { name: 'Properties For Sale', url: '/properties/buy' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Properties For Sale in Peshawar & Kalam</h1>`,
    },
    {
      path: '/properties/rent',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: today,
      title: 'Properties For Rent in Peshawar & Kalam | Peshawars.com',
      description:
        'Find verified furnished apartments, executive houses, and commercial spaces for rent in Peshawar and Kalam.',
      keywords: 'houses for rent Peshawar, apartments for rent University Town Peshawar, commercial rent Peshawar',
      imageUrl: toAbsoluteUrl('/assets/hero/slide3.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Properties For Rent', url: `${SITE_URL}/properties/rent` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Properties', url: '/properties' },
            { name: 'Properties For Rent', url: '/properties/rent' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Properties For Rent in Peshawar & Kalam</h1>`,
    },
    {
      path: '/properties/commercial',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: today,
      title: 'Commercial Real Estate in Peshawar & Kalam | Peshawars.com',
      description:
        'High-yield corporate offices, shops, and commercial spaces in Peshawar and Kalam commercial hubs.',
      keywords: 'commercial property Peshawar, shops for sale Peshawar, corporate offices University Road Peshawar',
      imageUrl: toAbsoluteUrl('/assets/pages/why-choose-us.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Commercial Real Estate', url: `${SITE_URL}/properties/commercial` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Properties', url: '/properties' },
            { name: 'Commercial Real Estate', url: '/properties/commercial' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Commercial Real Estate in Peshawar & Kalam</h1>`,
    },
    {
      path: '/properties/plots',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: today,
      title: 'Plots & Prime Land in DHA Peshawar, Regi & Kalam | Peshawars.com',
      description:
        'Verified residential and commercial plots across DHA Peshawar, Regi Model Town, Hayatabad, and Kalam.',
      keywords: 'plots for sale DHA Peshawar, Regi Model Town plots, Hayatabad residential plots',
      imageUrl: toAbsoluteUrl('/assets/hero/slide5.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Plots & Prime Land', url: `${SITE_URL}/properties/plots` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Properties', url: '/properties' },
            { name: 'Plots & Prime Land', url: '/properties/plots' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Plots & Prime Land in Peshawar & Kalam</h1>`,
    },
    {
      path: '/projects',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: today,
      title: 'Signature Real Estate Projects in Peshawar & Kalam | Peshawars.com',
      description:
        'Explore verified master-planned developments by PESHAWER REAL ESTATE: Town Garden (University Town Peshawar), Glamorous Heights (Kalam), Kalam Cottages, and Corner Apartments Kalam.',
      keywords:
        'Town Garden Peshawar, Glamorous Heights Kalam, Kalam Cottages, Corner Apartments Kalam, TMA approved apartments Kalam',
      imageUrl: toAbsoluteUrl('/assets/hero/slide2.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: 'Signature Developments — Peshawars.com', url: `${SITE_URL}/projects` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Projects', url: '/projects' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Signature Developments in Peshawar & Kalam</h1><ul>${publishedProjects
        .map((p) => `<li><a href="/projects/${p.slug}">${escapeHtml(p.name)} — ${escapeHtml(p.city)}</a></li>`)
        .join('')}</ul>`,
    },
    {
      path: '/about',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: today,
      title: 'About PESHAWER REAL ESTATE — Trusted Property Advisory in KPK | Peshawars.com',
      description:
        'Learn about PESHAWER REAL ESTATE (Peshawars.com): verified TMA-approved developments, transparent legal documentation, and luxury projects across Peshawar and Kalam Swat.',
      keywords: 'About PESHAWER REAL ESTATE, Peshawars.com, trusted property dealer Peshawar',
      imageUrl: toAbsoluteUrl('/assets/pages/about-hero.jpg'),
      jsonLd: buildOrganizationAndWebsiteSchema(),
      noscriptHtml: `<h1>About PESHAWER REAL ESTATE</h1><p>Main University Road, Opp. Islamia College, Peshawar. UAN: 0311-7000900.</p>`,
    },
    {
      path: '/contact',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: today,
      title: 'Contact PESHAWER REAL ESTATE — Head Office University Road Peshawar | Peshawars.com',
      description:
        'Contact PESHAWER REAL ESTATE (Peshawars.com) for verified property bookings, site visits, and official payment plans in Peshawar & Kalam. UAN: 0311-7000900.',
      keywords: 'contact PESHAWER REAL ESTATE, Peshawars.com phone, University Road Peshawar office',
      imageUrl: toAbsoluteUrl('/assets/pages/contact-hero.jpg'),
      jsonLd: buildOrganizationAndWebsiteSchema(),
      noscriptHtml: `<h1>Contact PESHAWER REAL ESTATE</h1><p>UAN: 03117000900 | Email: info@peshawars.com | Main University Road, Peshawar.</p>`,
    },
    {
      path: '/blogs',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: today,
      title: 'Peshawar & Kalam Real Estate Blog & Investment Guides | Peshawars.com',
      description:
        'Read verified market intelligence, legal due diligence tips, University Town Peshawar buying guides, and Kalam Swat real estate investment insights.',
      keywords: 'Peshawar real estate blog, Kalam investment guide, University Town property guide',
      imageUrl: toAbsoluteUrl('/assets/hero/slide4.jpg'),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Blog', name: 'PESHAWER REAL ESTATE Insights & News', url: `${SITE_URL}/blogs` },
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blogs', url: '/blogs' },
          ]),
        ],
      },
      noscriptHtml: `<h1>Real Estate Insights & Editorial</h1><ul>${publishedBlogs
        .map((b) => `<li><a href="/blogs/${b.slug}">${escapeHtml(b.title)}</a></li>`)
        .join('')}</ul>`,
    },
    {
      path: '/privacy-policy',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: today,
      title: 'Privacy Policy | Peshawars.com',
      description:
        'Privacy Policy governing property inquiries, site visit bookings, and personal information protection at PESHAWER REAL ESTATE (Peshawars.com).',
      imageUrl: toAbsoluteUrl('/assets/projects/town-garden/hero.png'),
      noscriptHtml: `<h1>Privacy Policy — Peshawars.com</h1>`,
    },
    {
      path: '/terms-and-conditions',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: today,
      title: 'Terms and Conditions | Peshawars.com',
      description:
        'Official booking terms, installment schedule guidelines, and property documentation policies at PESHAWER REAL ESTATE (Peshawars.com).',
      imageUrl: toAbsoluteUrl('/assets/projects/corner-apartments-kalam/hero.png'),
      noscriptHtml: `<h1>Terms and Conditions — Peshawars.com</h1>`,
    },
  ];

  for (const project of publishedProjects) {
    routes.push({
      path: `/projects/${project.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: today,
      title: `${project.name} (${project.city}) — Payment Plan & Details | Peshawars.com`,
      description: `${project.tagline} ${project.verifiedApproval}. ${project.description.slice(0, 140)}`,
      keywords: `${project.name}, ${project.name} ${project.city}, ${project.name} payment plan, ${project.verifiedApproval}, Peshawars.com`,
      imageUrl: toAbsoluteUrl(project.heroImage),
      jsonLd: buildProjectSchema(project),
      noscriptHtml: `<h1>${escapeHtml(project.name)} — ${escapeHtml(project.location)}</h1><p>${escapeHtml(project.description)}</p>`,
    });
  }

  for (const property of publishedProperties) {
    const slug = property.slug || property.id;
    routes.push({
      path: `/properties/${slug}`,
      priority: '0.85',
      changefreq: 'weekly',
      lastmod: (property.updatedAt || today).slice(0, 10),
      title: `${property.title} | Peshawars.com`,
      description: `${property.purpose === 'Rent' ? 'For Rent' : 'For Sale'} in ${property.location}: ${property.description.slice(0, 155)}`,
      keywords: `${property.title}, ${property.category} in ${property.city}, ${property.location} property, Peshawars.com`,
      imageUrl: toAbsoluteUrl(property.featuredImage),
      type: 'product',
      jsonLd: buildPropertySchema(property),
      noscriptHtml: `<h1>${escapeHtml(property.title)}</h1><p>${escapeHtml(property.description)}</p>`,
    });
  }

  for (const blog of publishedBlogs) {
    routes.push({
      path: `/blogs/${blog.slug}`,
      priority: '0.75',
      changefreq: 'monthly',
      lastmod: (blog.publishedAt || today).slice(0, 10),
      title: `${blog.title} | Peshawars.com`,
      description: blog.excerpt,
      keywords: `${blog.category}, ${blog.title}, Peshawar real estate, Peshawars.com`,
      imageUrl: toAbsoluteUrl(blog.coverImage),
      type: 'article',
      jsonLd: buildBlogSchema(blog),
      noscriptHtml: `<article><h1>${escapeHtml(blog.title)}</h1><p>${escapeHtml(blog.excerpt)}</p></article>`,
    });
  }

  // 1. Write prerendered route HTML files into dist/
  for (const route of routes) {
    const html = injectRouteSeoIntoHtml(baseHtml, route);
    const outFile =
      route.path === '/'
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, `${route.path.slice(1)}.html`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, 'utf-8');
  }

  // 2. Write robots.txt to dist/ and public/
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /admin-login',
    'Disallow: /dashboard',
    'Disallow: /dashboard/',
    'Disallow: /user',
    'Disallow: /user/',
    'Disallow: /login',
    'Disallow: /signup',
    'Disallow: /forgot-password',
    'Disallow: /auth/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  // 3. Write XML sitemap with image extensions to dist/ and public/
  const urlEntries = routes
    .map((r) => {
      const loc = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
      const imageBlock = r.imageUrl
        ? `\n    <image:image>\n      <image:loc>${escapeXml(r.imageUrl)}</image:loc>\n      <image:title>${escapeXml(r.title)}</image:title>\n    </image:image>`
        : '';
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${imageBlock}
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log(
    `[SEO] Generated ${routes.length} prerendered HTML routes, sitemap.xml (${routes.length} URLs), and robots.txt.`
  );
}

main();
