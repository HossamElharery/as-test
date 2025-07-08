/**
 * AUTOMATED HYDRATION FIX SCRIPT
 * This script contains all the fixes needed for innerHTML hydration issues
 */

export const HYDRATION_FIXES = {
  // TypeScript files that need SafeHtmlComponent import and getSafeContent method
  TS_FILES: [
    'src/app/pages/travel-guide/single-guide/single-guide.component.ts',
    'src/app/pages/travel-package/components/single-package/single-package.component.ts',
    'src/app/pages/travel-package/components/catergory/catergory.component.ts',
    'src/app/pages/travel-guide/travel-guide/travel-guide.component.ts',
    'src/app/pages/travel-package/components/multi-country-packages/multi-country-packages.component.ts',
    'src/app/pages/travel-package/components/category-packages/category-packages.component.ts',
    'src/app/pages/travel-cruises/single-cruises/single-cruises.component.ts',
    'src/app/pages/travel-guide/all-travelguide/all-travelguide.component.ts',
    'src/app/pages/travel-cruises/all-cruises/all-cruises.component.ts',
    'src/app/pages/travel-excursion/all-excursion/all-excursion.component.ts',
    'src/app/pages/pages/single-page/single-page.component.ts',
    'src/app/pages/pages/all-pages/all-pages.component.ts',
    'src/app/pages/travel-excursion/city-excursion/city-excursion.component.ts',
    'src/app/pages/hotels/all-hotels/all-hotels.component.ts',
    'src/app/pages/hotels/hotel/hotel.component.ts',
    'src/app/pages/hotels/hotels-cities/hotels-cities.component.ts',
    'src/app/pages/home/components/safety-home/safety-home.component.ts',
    'src/app/pages/home/components/why-ask/why-ask.component.ts',
    'src/app/pages/home/components/home-blog/home-blog.component.ts',
    'src/app/pages/home/components/book-home/book-home.component.ts',
    'src/app/pages/blogs/cities-blogs/cities-blogs.component.ts',
    'src/app/pages/destinations/components/one-destination/one-destination.component.ts',
    'src/app/pages/destinations/components/all-destination/all-destination.component.ts',
    'src/app/pages/blogs/blog/blog.component.ts',
    'src/app/pages/blogs/all-blog/all-blog.component.ts',
    'src/app/core/components/useful-links/useful-links.component.ts',
    'src/app/core/components/privacy-policy/privacy-policy.component.ts',
    'src/app/core/components/our-story/our-story.component.ts',
    'src/app/core/components/about-us/about-us.component.ts',
    'src/app/shared/components/prices-policy/prices-policy.component.ts'
  ],

  // HTML replacements needed
  HTML_REPLACEMENTS: [
    {
      pattern: /\[innerHTML\]="([^"]*)\s*\|\s*codeHtml:'html'"/g,
      replacement: '[htmlContent]="getSafeContent($1)"'
    },
    {
      pattern: /\[innerHTML\]="([^"]*)\s*\|\s*safeHtml"/g,
      replacement: '[htmlContent]="getSafeContent($1)"'
    },
    {
      pattern: /\[innerHtml\]="([^"]*)\s*\|\s*codeHtml:'html'"/g,
      replacement: '[htmlContent]="getSafeContent($1)"'
    },
    {
      pattern: /\[innerHtml\]="([^"]*)\s*\|\s*safeHtml"/g,
      replacement: '[htmlContent]="getSafeContent($1)"'
    },
    {
      pattern: /\[innerHTML\]="([^"]*)"(?!\s*\|)/g,
      replacement: '[htmlContent]="getSafeContent($1)"'
    }
  ],

  // TypeScript template to add to components
  TS_ADDITIONS: `
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';

// Add to imports array: SafeHtmlComponent

// Add to component class:
private platformId = inject(PLATFORM_ID);
private isBrowser = isPlatformBrowser(this.platformId);

getSafeContent(content: string): string {
  if (!this.isBrowser || !content) {
    return '';
  }
  return content;
}
  `,

  // HTML template changes
  HTML_CHANGES: `
Replace all innerHTML bindings with:
<app-safe-html [htmlContent]="getSafeContent(content)"></app-safe-html>

Instead of:
<p [innerHTML]="content | codeHtml:'html'"></p>
<div [innerHTML]="content | safeHtml"></div>
<span [innerHtml]="content | codeHtml:'html'"></span>
  `
};

console.log('HYDRATION_FIXES loaded - ready for systematic application');
