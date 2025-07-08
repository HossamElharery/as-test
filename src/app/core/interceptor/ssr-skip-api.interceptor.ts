import { Injectable, makeStateKey, TransferState, StateKey } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, timeout, catchError } from 'rxjs/operators';
import { PlatformService } from '../services/platform.service';

/**
 * Intelligent SSR Interceptor that:
 * 1. Allows SEO-critical API calls during SSR for proper meta tag generation
 * 2. Caches SEO-critical responses for client-side use to prevent duplicates
 * 3. Skips non-critical API calls during SSR to improve performance
 * 4. Returns mock responses for non-critical calls to prevent component errors
 * 5. Handles timeouts to prevent SSR hanging
 */
@Injectable()
export class SsrSkipApiInterceptor implements HttpInterceptor {
  constructor(
    private platformService: PlatformService,
    private transferState: TransferState
  ) {}

  // Define which API endpoints are critical for SEO and should be allowed during SSR
  private seoMCriticalEndpoints = [
    '/global-seo',             // Global SEO data (used by resolver)
    '/destinations',           // Destination SEO data
    '/destination/',           // Single destination data
    '/packages',               // Packages SEO data
    '/package/',               // Single package data
    '/getSinglepackage',       // Single package details
    '/single-package',         // Alternative single package endpoint
    '/blog/',                  // Single blog data
    '/blogs',                  // Blog listing data
    '/getSingleBlogs',         // Single blog details
    '/cruises',                // Cruise listing data
    '/cruise/',                // Single cruise data
    '/getSingleCruise',        // Single cruise details
    '/hotels',                 // Hotel listing data
    '/hotel/',                 // Single hotel data
    '/getSingleHotel',         // Single hotel details
    '/excursions',             // Excursion listing data
    '/excursion/',             // Single excursion data
    '/getSingleExcursion',     // Single excursion details
    '/travel-guide',           // Travel guide data
    '/travel-guides',          // Travel guides listing
    '/getSingleTravelGuide',   // Single travel guide details
    '/tour-types',             // Tour type data
    '/single-tour-type',       // Single tour type data
    '/getSingleTourType',      // Single tour type details
    '/page/',                  // Page data (general/single)
    '/pages/',                 // Pages listing
    '/single-pages',           // Single page data
    '/getSinglePages',         // Single page details
    '/category',               // Category data
    '/categories',             // Categories listing
    '/single_category',        // Single category data
    '/getCategory',            // Category details
    '/faqs',                   // FAQ data
    '/faq/',                   // Single FAQ data
    '/getFaqs',                // FAQ details
    '/menus',                  // Menu data for navigation
    '/socials',                // Social media data - CRITICAL FOR CONTACT/FOOTER
    '/abouts',                 // About us data
    '/sliders',                // Slider/banner data
    '/search/',                // Search functionality (SEO important)
    '/filter-',                // Filter endpoints (filter-package, filter-cruise, etc.)
    '/hot-offer',              // Hot offers (SEO relevant)
    '/hotels-list',            // Hotels listing
    '/hotels-cities',          // Hotel cities
    '/side-photos',            // Side photos for pages
    '/lang-control',           // Language control
    '/multi-country',          // Multi-country packages - CRITICAL FOR MULTI-COUNTRY ROUTE
    '/multi-country-packages', // Multi-country packages endpoint
    '/cities',                 // Cities data
    '/getOneDestinationDetails', // Destination details
    '/home/',                  // Home page data
    '/getHome',                // Home page details
    '/general/general'         // General page data for our-story, meet-the-team, etc.
  ];

  // Define endpoints that should be completely skipped during SSR
  private skipEndpoints = [
    '/reviews/',               // User reviews (not critical for initial SEO)
    '/comments/',              // Comments (not critical for initial SEO)
    '/user/',                  // User data (not needed for SEO)
    '/booking/',               // Booking related calls
    '/cart/',                  // Shopping cart calls
    '/wishlist/',              // Wishlist calls
    '/newsletter/',            // Newsletter subscriptions
    '/contact/',               // Contact form submissions
    '/recommendations/',       // Dynamic recommendations
    '/analytics/',             // Analytics calls
    '/tracking/',              // Tracking calls
    '/email-subscription',     // Email subscriptions (not SEO critical)
    '/download/',              // File downloads (not SEO critical)
    '/testimonials',           // User testimonials (can be loaded client-side)
    '/counter'                 // Counter/stats (not SEO critical)
  ];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if this is an API call to ask-aladdin.com
    if (!request.url.includes('api.ask-aladdin.com')) {
      return next.handle(request);
    }

    const url = request.url;
    const key: StateKey<any> = makeStateKey<any>(`ssr-cache-${request.urlWithParams}`);

    // Server-side logic
    if (this.platformService.isServer()) {
      console.log(`SSR API Call: ${url}`);

      // Check if this endpoint should be completely skipped
      const shouldSkip = this.skipEndpoints.some(endpoint => url.includes(endpoint));
      if (shouldSkip) {
        console.log(`Skipping non-critical API call during SSR: ${url}`);
        return of(new HttpResponse({
          body: { data: [], message: 'Skipped during SSR' },
          status: 200
        }));
      }

      // Check if this is a SEO-critical endpoint
      const isSeoMCritical = this.seoMCriticalEndpoints.some(endpoint => url.includes(endpoint));
      if (isSeoMCritical) {
        console.log(`Allowing SEO-critical API call during SSR: ${url}`);
        // Cache the response for client-side use with timeout
        return next.handle(request).pipe(
          timeout(10000), // 10 second timeout for SSR
          tap(event => {
            if (event instanceof HttpResponse) {
              this.transferState.set(key, event.body);
            }
          }),
          catchError(error => {
            console.error(`SSR API call failed for ${url}:`, error);
            // Return a structured mock response on error to prevent component crashes
            return of(new HttpResponse({
              body: {
                data: [],
                page: [{ // For getSinglePageGeneral endpoints
                  seo: {
                    title: '',
                    description: '',
                    keywords: '',
                    robots: 'index,follow',
                    facebook_description: '',
                    facebook_image: '',
                    facebook_title: '',
                    twitter_description: '',
                    twitter_image: '',
                    twitter_title: '',
                    schema: ''
                  },
                  name: '',
                  description: '',
                  banner: '',
                  form: '',
                  related_pages: [],
                  related_blogs: [],
                  related_packages: [],
                  related_cruises: [],
                  related_excursions: [],
                  related_travel_guides: [],
                  related_categories: [],
                  accordion: []
                }],
                packages: [], // For multi-country packages
                category: { // For category pages
                  seo: {
                    title: '',
                    description: '',
                    keywords: '',
                    robots: 'index,follow',
                    facebook_description: '',
                    facebook_image: '',
                    facebook_title: '',
                    twitter_description: '',
                    twitter_image: '',
                    twitter_title: '',
                    schema: ''
                  },
                  banner: '',
                  name: '',
                  description: ''
                },
                message: 'Fallback response due to SSR timeout'
              },
              status: 200
            }));
          })
        );
      }

      // For other API calls, return a structured mock response to prevent hydration errors
      console.log(`Returning structured mock response for API call during SSR: ${url}`);
      return of(new HttpResponse({
        body: {
          data: [],
          message: 'Mock response during SSR',
          // Include structured data that components might expect
          seo: {
            title: '',
            description: '',
            keywords: '',
            robots: 'index,follow'
          },
          // For package/itinerary data
          day_data: [],
          three_nights: [],
          four_nights: [],
          seven_nights: [],
          // For other content
          accordion: [],
          related_pages: []
        },
        status: 200
      }));
    }

    // Client-side logic - check for cached response first
    if (this.transferState.hasKey(key)) {
      const cachedResponse = this.transferState.get(key, null);
      this.transferState.remove(key); // Prevent stale data
      console.log(`Using cached response for: ${url}`);
      return of(new HttpResponse({ body: cachedResponse }));
    }

    // If no cached response, proceed with the request normally
    return next.handle(request);
  }
}
