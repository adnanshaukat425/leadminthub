# SEO Setup Instructions

This document provides instructions for completing the SEO setup for Leadminthub.

## Google Analytics 4 Setup

1. **Create a Google Analytics 4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for Leadminthub
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update the Tracking Code:**
   - Open `index.html`
   - Find the Google Analytics 4 section in the `<head>`
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID (appears twice in the code)

3. **Set Up Conversion Tracking:**
   - In Google Analytics, go to Admin > Events
   - Mark "form_submission" as a conversion event
   - This will track when users submit the contact form

## Google Search Console Setup

1. **Verify Website Ownership:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `https://www.leadminthub.com`
   - Choose verification method (HTML file upload, meta tag, or DNS)
   - Complete verification

2. **Submit Sitemap:**
   - After verification, go to Sitemaps section
   - Submit: `https://www.leadminthub.com/sitemap.xml`
   - Google will automatically crawl your site

3. **Monitor Performance:**
   - Check Search Performance for keyword rankings
   - Monitor Core Web Vitals
   - Review indexing status
   - Check for any crawl errors

## Additional SEO Tasks

### 1. Create Social Media Images
- Create `assets/images/og-image.jpg` (1200x630px) for Open Graph
- Create `assets/images/twitter-card.jpg` (1200x675px) for Twitter Cards
- Create `assets/images/logo-dark.png` for structured data

### 2. Update Sitemap Dates
- Update `lastmod` dates in `sitemap.xml` when you make content changes
- Keep dates current for better indexing

### 3. Monitor and Optimize
- Track keyword rankings monthly
- Monitor Google Search Console for issues
- Update content regularly with fresh keywords
- Build quality backlinks
- Monitor Core Web Vitals performance

### 4. Local SEO (Karachi)
- Create Google Business Profile for Karachi location
- Get listed in local directories
- Encourage customer reviews
- Use consistent NAP (Name, Address, Phone) across all platforms

## Target Keywords

**Primary Keywords:**
- lead generation services
- lead generation company
- lead generation agency

**Secondary Keywords:**
- qualified leads
- lead generation for business
- B2B lead generation
- digital marketing leads

**Local Keywords:**
- lead generation services Karachi
- lead generation company Pakistan
- lead generation agency Karachi

## Performance Monitoring

Regularly check:
- Google Analytics: User behavior, conversions, traffic sources
- Google Search Console: Search queries, click-through rates, impressions
- Core Web Vitals: LCP, FID, CLS scores
- Keyword rankings: Track target keywords monthly

## Notes

- The Google Analytics code includes automatic form submission tracking
- All structured data (Schema.org) is already implemented
- The sitemap includes hreflang tags for US and Pakistan targeting
- FAQ schema is implemented for featured snippets
- LocalBusiness schema includes Karachi location data

