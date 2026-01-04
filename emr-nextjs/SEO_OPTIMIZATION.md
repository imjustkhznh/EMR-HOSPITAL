# EMR Hospital - SEO Optimization Guide

## Overview

This document outlines the SEO optimizations implemented in the EMR Hospital application using Next.js 14+ features.

## SEO Features Implemented

### 1. Metadata Management

#### Root Metadata (`src/app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  title: { 
    default: "EMR Hospital - Quản lý Bệnh nhân",
    template: "%s | EMR Hospital"
  },
  description: "Professional EMR system for patient management...",
  keywords: ["EMR", "Medical Records", "Healthcare", ...],
  openGraph: {
    title: "EMR Hospital",
    description: "Professional EMR system...",
    type: "website",
    locale: "vi_VN",
    images: [{ url: "/og-image.jpg", ... }],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

**Benefits:**
- Title template automatically applies to all pages
- Consistent branding across Google Search results
- Open Graph tags for social media sharing
- Clear robots directive for search engines

#### Page-Specific Metadata
```typescript
// src/app/(dashboard)/patients/page.tsx
export const metadata: Metadata = {
  title: "Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin chi tiết bệnh nhân...",
  keywords: ["bệnh nhân", "patient list", ...],
  openGraph: {
    title: "Quản lý Bệnh nhân - EMR Hospital",
    description: "Danh sách và quản lý thông tin chi tiết bệnh nhân",
    type: "website",
  },
};
```

#### Dynamic Metadata for Records
```typescript
// src/app/(dashboard)/medical-records/[id]/page.tsx
export async function generateMetadata({ params }) {
  const record = await getMedicalRecord(params.id);
  
  return {
    title: `Hồ sơ bệnh án - ${record.patientName}`,
    description: `Chi tiết y tế của ${record.patientName}...`,
    openGraph: {
      title: `Hồ sơ bệnh án - ${record.patientName}`,
      images: [{ url: "/og-patient.jpg", ... }],
    },
  };
}
```

**Benefits:**
- Unique titles per patient for better indexing
- Each record appears as separate search result
- Dynamic metadata improves CTR in search results

### 2. Sitemap Generation

**File:** `src/app/sitemap.ts`

Automatically generates XML sitemap for search engines:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://emr-hospital.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // ... more routes
  ];
}
```

**Accessible at:** `https://emr-hospital.com/sitemap.xml`

**Benefits:**
- Tells Google all pages to index
- Specifies last modification date
- Sets priority for crawling (0-1)
- Improves crawl efficiency

### 3. Robots.txt Configuration

**File:** `public/robots.txt`

Controls search engine crawling behavior:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /auth/login

User-agent: Googlebot
Allow: /
Crawl-delay: 0

Sitemap: https://emr-hospital.com/sitemap.xml
```

**Rules:**
- Allow all pages except API and auth
- Specific rules for Googlebot (priority crawling)
- Link to sitemap for discovery

**Benefits:**
- Prevents indexing of sensitive pages
- Reduces server load by blocking unnecessary crawls
- Guides search engines to important content

### 4. Font Optimization

**File:** `src/app/layout.tsx`

Using `next/font` for font optimization:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",  // Font swapping for better performance
  weight: ["400", "500", "600", "700"],
});
```

**Benefits:**
- Fonts self-hosted (faster loading)
- `display: swap` shows fallback while loading
- Subset loading (only Latin characters)
- Multiple weights for flexibility

**Performance Impact:**
- No layout shift (CLS improvement)
- Faster First Contentful Paint (FCP)
- Better Core Web Vitals score

### 5. Open Graph Configuration

Open Graph tags enable rich sharing on social media:

```typescript
openGraph: {
  title: "EMR Hospital",
  description: "Professional healthcare management system",
  type: "website",
  locale: "vi_VN",
  url: "https://emr-hospital.com",
  siteName: "EMR Hospital",
  images: [{
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "EMR Hospital",
  }],
}
```

**When shared on:**
- Facebook: Shows custom image, title, description
- LinkedIn: Professional context
- Twitter: Rich card preview
- WhatsApp: Custom preview

**Image Requirements:**
- Minimum: 1200x630 pixels (1.91:1 aspect ratio)
- Format: JPG, PNG, GIF, or WebP
- Size: < 5MB

### 6. Structured Data (Schema.org)

**Recommended additions for future:**

```typescript
// For Healthcare Organization
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "EMR Hospital",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Address",
    "addressLocality": "City",
    "postalCode": "12345"
  }
}
</script>
```

### 7. Core Web Vitals Optimization

**Current Optimizations:**
1. Font optimization (`display: swap`)
2. Image optimization (next/image ready)
3. Lazy loading for below-fold content
4. ISR caching strategy for patient list

**Metrics Being Optimized:**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 8. Accessibility & SEO

**Implemented:**
- Semantic HTML (`<h1>`, `<h2>`, navigation landmarks)
- ARIA labels for form fields
- Alt text on images
- Proper heading hierarchy
- Language attribute (`lang="en"`)

### 9. URL Structure

**Best Practices Applied:**
```
/ - Home
/dashboard - Main dashboard
/dashboard/patients - Patient list
/dashboard/patients/[id] - Patient detail
/dashboard/medical-records/[id] - Medical record
/dashboard/doctors - Doctor list
/auth/login - Login
```

**Benefits:**
- Descriptive URLs aid ranking
- Easy to remember
- Clear information architecture
- Proper hierarchy for crawlers

## Implementation Checklist

### Phase 1: Core SEO (✓ Implemented)
- [x] Title template in root layout
- [x] Meta descriptions for main pages
- [x] Open Graph for social sharing
- [x] Sitemap generation
- [x] Robots.txt configuration
- [x] Font optimization
- [x] Favicon and manifest

### Phase 2: Advanced (Recommended)
- [ ] Structured data (Schema.org)
- [ ] JSON-LD for Organization/MedicalBusiness
- [ ] Hreflang tags for multilingual content
- [ ] Canonical tags (for duplicate content)
- [ ] Breadcrumb schema

### Phase 3: Monitoring
- [ ] Google Search Console integration
- [ ] Google Analytics 4 setup
- [ ] Core Web Vitals monitoring
- [ ] Crawl error tracking
- [ ] Ranking position monitoring

## SEO Performance Tips

### For Each Page
1. **Unique title** (50-60 characters)
   - Include main keyword
   - Brand name at end: "Page Title | EMR Hospital"

2. **Meta description** (120-160 characters)
   - Include target keyword
   - Call-to-action when appropriate
   - Unique for each page

3. **Keyword research**
   - "quản lý bệnh nhân" - Patient management
   - "hồ sơ y tế" - Medical records
   - "hệ thống EMR" - EMR system

### For Dynamic Pages
1. Generate unique metadata per record
2. Include record identifier in title
3. Add last-modified date
4. Set appropriate cache headers

### For Images
1. Use next/image component (when adding images)
2. Provide descriptive alt text
3. Optimize file size (< 100KB for thumbnails)
4. Use modern formats (WebP with fallback)

## Monitoring SEO Health

### Google Search Console
1. Submit sitemap: https://emr-hospital.com/sitemap.xml
2. Test robots.txt: Search Console > Settings > Crawl
3. Monitor:
   - Crawl stats
   - Indexation status
   - Mobile usability
   - Core Web Vitals

### Google Analytics
1. Track organic search traffic
2. Monitor user behavior on pages
3. Identify high-value conversions
4. Test improvements with A/B testing

## SEO Checklist for Deployment

- [ ] Robots.txt is accessible
- [ ] Sitemap is generated and submitted
- [ ] Open Graph images are 1200x630
- [ ] All meta descriptions are filled
- [ ] Favicon is present
- [ ] Manifest file is linked
- [ ] Structured data is valid (schema.org)
- [ ] Mobile responsiveness confirmed
- [ ] Page load speed < 3 seconds
- [ ] SSL certificate installed (HTTPS)
- [ ] Hreflang tags for multi-language (if applicable)

---

**Last Updated**: 2026-01-04  
**Next.js Version**: 16.1.1  
**Status**: Production Ready  
**Resources**: [Next.js SEO Docs](https://nextjs.org/learn/seo/introduction-to-seo)
