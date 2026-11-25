import { BlogPost, Project, Property } from '../types';

export const SITE_URL = 'https://www.peshawars.com';
export const SITE_NAME = 'Peshawars.com — PESHAWER REAL ESTATE';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero/home-clean.png`;
export const BRAND_LOGO_URL = `${SITE_URL}/assets/navbar-logo.png`;

export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

/** Converts a relative or absolute asset path into a canonical https://peshawars.com URL. */
export function toAbsoluteUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return DEFAULT_OG_IMAGE;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const clean = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${clean}`;
}

/** Builds a Schema.org BreadcrumbList node. */
export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

/** Builds Organization, RealEstateAgent, and WebSite JSON-LD schemas for Peshawar & Kalam. */
export function buildOrganizationAndWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'Organization'],
        '@id': `${SITE_URL}/#organization`,
        name: 'PESHAWER REAL ESTATE',
        alternateName: ['Peshawars.com', 'Peshawars Real Estate'],
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: BRAND_LOGO_URL,
        },
        image: DEFAULT_OG_IMAGE,
        description:
          'Trusted real estate consultancy and signature residential & commercial developer in Peshawar, University Town, DHA Peshawar, and Kalam Swat with verified TMA approvals and flexible installment plans.',
        telephone: '+923117000900',
        email: 'info@peshawars.com',
        priceRange: 'PKR 37 Lakh - PKR 10 Crore+',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Main University Road, Opp. Islamia College',
          addressLocality: 'Peshawar',
          addressRegion: 'Khyber Pakhtunkhwa',
          postalCode: '25000',
          addressCountry: 'PK',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 34.0083,
          longitude: 71.5015,
        },
        areaServed: [
          { '@type': 'City', name: 'Peshawar' },
          { '@type': 'Place', name: 'University Town, Peshawar' },
          { '@type': 'Place', name: 'DHA Peshawar' },
          { '@type': 'Place', name: 'Hayatabad, Peshawar' },
          { '@type': 'Place', name: 'Regi Model Town, Peshawar' },
          { '@type': 'City', name: 'Kalam, Swat' },
        ],
        sameAs: [
          'https://facebook.com/peshawerrealestate',
          'https://instagram.com/peshawerrealestate',
          'https://youtube.com/@peshawerrealestate',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Peshawars.com',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-PK',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/properties?location={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

/** Builds FAQPage JSON-LD schema for high-intent Peshawar & Kalam property searches. */
export function buildHomeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which verified real estate projects are available on Peshawars.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Peshawars.com features four flagship verified developments: Town Garden in University Town Peshawar, Glamorous Heights in Kalam Swat, Kalam Cottages, and Corner Apartments Kalam, along with vetted houses, plots, and commercial properties across Peshawar.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the payment plan for Glamorous Heights Kalam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Glamorous Heights Kalam is a TMA-approved project offering a 5-year (60-month) easy installment plan: Studio Apartments (380 sq ft) at Rs. 37,00,000, One-Bedroom Apartments (450 sq ft) at Rs. 48,00,000, and Two-Bedroom Apartments (680 sq ft) at Rs. 65,00,000, starting from Rs. 1,00,000 booking.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can overseas Pakistanis or local buyers book a property or site visit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can schedule a verified site visit or request official payment schedules directly on Peshawars.com or contact PESHAWER REAL ESTATE on UAN / WhatsApp +92 311 7000900 or info@peshawars.com.',
        },
      },
    ],
  };
}

/** Builds structured data for a Signature Project detail page. */
export function buildProjectSchema(project: Project) {
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;
  const offers = (project.apartments || []).map((apt) => ({
    '@type': 'Offer',
    name: `${project.name} — ${apt.title}`,
    description: `${apt.bedrooms > 0 ? `${apt.bedrooms} Bedroom ` : ''}${apt.sizeSqFt} sq ft unit with ${apt.monthlyCount} monthly installments`,
    price: apt.totalPricePKR,
    priceCurrency: 'PKR',
    availability: apt.availableUnits === 0 ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    url: canonicalUrl,
  }));

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'ApartmentComplex',
      '@id': `${canonicalUrl}#project`,
      name: project.name,
      description: project.description,
      url: canonicalUrl,
      image: [toAbsoluteUrl(project.heroImage), ...(project.gallery?.all || []).slice(0, 4).map(toAbsoluteUrl)],
      address: {
        '@type': 'PostalAddress',
        streetAddress: project.location,
        addressLocality: project.city,
        addressRegion: 'Khyber Pakhtunkhwa',
        addressCountry: 'PK',
      },
      ...(offers.length > 0 ? { offers } : {}),
    },
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: project.name, url: `/projects/${project.slug}` },
    ]),
  ];

  if (project.hasVideo && project.videoUrl) {
    graph.push({
      '@type': 'VideoObject',
      name: project.videoTitle || `${project.name} Walkthrough`,
      description: project.videoDescription || project.tagline,
      thumbnailUrl: toAbsoluteUrl(project.videoPoster || project.heroImage),
      contentUrl: toAbsoluteUrl(project.videoUrl),
      uploadDate: '2026-11-01T00:00:00+05:00',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Builds RealEstateListing & Offer structured data for a property detail page. */
export function buildPropertySchema(property: Property) {
  const canonicalPath = `/properties/${property.slug || property.id}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const isRent = property.purpose === 'Rent';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': `${canonicalUrl}#listing`,
        name: property.title,
        description: property.description,
        url: canonicalUrl,
        datePosted: property.createdAt || '2026-11-01T10:00:00Z',
        image: [
          toAbsoluteUrl(property.featuredImage),
          ...(property.gallery || []).slice(0, 4).map(toAbsoluteUrl),
        ],
        offers: {
          '@type': 'Offer',
          price: property.pricePKR,
          priceCurrency: 'PKR',
          businessFunction: isRent
            ? 'http://purl.org/goodrelations/v1#LeaseOut'
            : 'http://purl.org/goodrelations/v1#Sell',
          availability:
            property.status === 'Sold' || property.status === 'Rented'
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          url: canonicalUrl,
        },
        about: {
          '@type': property.category === 'Apartment' ? 'Apartment' : 'SingleFamilyResidence',
          name: property.title,
          numberOfRooms: property.bedrooms || undefined,
          numberOfBathroomsTotal: property.bathrooms || undefined,
          floorSize: {
            '@type': 'QuantitativeValue',
            value: property.area,
            unitText: property.areaUnit,
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: property.address || property.location,
            addressLocality: property.city,
            addressRegion: 'Khyber Pakhtunkhwa',
            addressCountry: 'PK',
          },
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Properties', url: '/properties' },
        { name: property.title, url: canonicalPath },
      ]),
    ],
  };
}

/** Builds BlogPosting structured data for a blog article page. */
export function buildBlogSchema(blog: BlogPost) {
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: blog.title,
        description: blog.excerpt,
        image: toAbsoluteUrl(blog.coverImage),
        datePublished: blog.publishedAt,
        dateModified: blog.publishedAt,
        articleSection: blog.category,
        author: {
          '@type': 'Person',
          name: blog.author,
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blogs', url: '/blogs' },
        { name: blog.title, url: `/blogs/${blog.slug}` },
      ]),
    ],
  };
}
