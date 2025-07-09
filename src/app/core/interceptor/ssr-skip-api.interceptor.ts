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
 * COMPLETE SSR Interceptor - Final Version
 *
 * After comprehensive analysis of all services in the project:
 * - HomeserviceService (50+ endpoints)
 * - LayoutService, DestinationsService, HomeService
 * - SeoResolver
 * - TranslateBrowserLoader
 *
 * This interceptor handles ALL API endpoints found in the entire project.
 *
 * Functions:
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

  // COMPLETE LIST: All SEO-critical endpoints found in the entire project
  private seoMCriticalEndpoints = [
    // === CORE SEO & GLOBAL DATA ===
    '/global-seo',             // globalSeo() - CRITICAL for meta tags
    '/global-seo/',            // Alternative pattern

    // === DESTINATIONS & NAVIGATION ===
    '/destinations',           // getAlldestination() - CRITICAL for navigation
    '/destinations/',          // Alternative pattern
    '/destination/',           // Multiple destination endpoints
    '/destination/packages/',  // getSingleDestination() & getCategoryPackage() - CRITICAL
    '/destination/blogs/',     // getDestinationEgy() & getDestinationBlogs() - CRITICAL
    '/destination/excursions/', // getDestinationExcursions() - CRITICAL
    '/destination/cruises/',   // getTravelCruises() - CRITICAL
    '/destination/faqs/',      // getDestinationFact() - CRITICAL
    '/destination/travel-guides/', // getDestinationGuides() - CRITICAL
    '/destination/footer/',    // categoryFooter() - CRITICAL for footer

    // === PACKAGES & TOURS ===
    '/packages',               // getPackages() - CRITICAL for package pages
    '/packages/',              // Alternative pattern
    '/package/',               // getSinglepackage() - CRITICAL for single package pages
    '/getSinglepackage',       // Alternative endpoint name
    '/single-package',         // Alternative single package endpoint
    '/tour-types',             // getTourType() - CRITICAL for tour type navigation
    '/tour-types/',            // Alternative pattern
    '/single-tour-type',       // getTourTypePackages() - CRITICAL for tour type pages
    '/single-tour-type/',      // Alternative pattern
    '/getSingleTourType',      // Alternative endpoint name

    // === BLOGS & CONTENT ===
    '/blog/',                  // getSingleBlogs() - CRITICAL for blog pages
    '/blog/1/',                // getBlogs() - CRITICAL for blog listing
    '/blogs',                  // Blog listing data
    '/blogs/',                 // Alternative pattern
    '/getSingleBlogs',         // Single blog details
    '/home/blog',              // getHomeBlog() - CRITICAL for home page
    '/home/blog/',             // Alternative pattern

    // === CRUISES & EXCURSIONS ===
    '/cruises',                // Cruise listing data
    '/cruises/',               // Alternative pattern
    '/cruise/',                // getSingleCruise() - CRITICAL for cruise pages
    '/getSingleCruise',        // Single cruise details
    '/excursions',             // Excursion listing data
    '/excursions/',            // Alternative pattern
    '/excursion/',             // getSingleExcursion() - CRITICAL for excursion pages
    '/getSingleExcursion',     // Single excursion details
    '/city/excursion/',        // allExcursionCity() - CRITICAL for city excursion pages

    // === HOTELS & ACCOMMODATIONS ===
    '/hotels',                 // Hotel listing data
    '/hotels/',                // Alternative pattern
    '/hotel/',                 // getSingleHotel() - CRITICAL for hotel pages
    '/getSingleHotel',         // Single hotel details
    '/hotels-list',            // getHotelsList() - CRITICAL for hotel listings
    '/hotels-list/',           // Alternative pattern
    '/hotels-cities',          // getHotelsCities() - CRITICAL for hotel cities
    '/hotels-cities/',         // Alternative pattern

    // === TRAVEL GUIDES ===
    '/travel-guide',           // getSingleGuide() - CRITICAL for guide pages
    '/travel-guide/',          // Alternative pattern
    '/travel-guides',          // Travel guides listing
    '/travel-guides/',         // Alternative pattern
    '/getSingleTravelGuide',   // Single travel guide details

    // === PAGES & CATEGORIES ===
    '/page/',                  // getSinglePage() & getSinglePageGeneral() - CRITICAL for all pages
    '/pages/',                 // getPage() & getPageContry() - CRITICAL for page listings
    '/single-pages',           // Single page data
    '/getSinglePages',         // Single page details
    '/category',               // Category data
    '/categories',             // getOneDestinationDetails() - CRITICAL for categories
    '/categories/',            // Alternative pattern
    '/single_category',        // getSeoCategory() - CRITICAL for category pages
    '/getCategory',            // Category details
    '/general/general',        // getSinglePageGeneral() - CRITICAL for general pages

    // === FAQS ===
    '/faqs',                   // FAQ data
    '/faqs/',                  // Alternative pattern
    '/faq/',                   // getSingleFaq() - CRITICAL for FAQ pages
    '/getFaqs',                // FAQ details

    // === NAVIGATION & LAYOUT ===
    '/menus',                  // getMegaMenu() - CRITICAL for navigation
    '/menus/',                 // Alternative pattern
    '/socials',                // getSocials() - CRITICAL for contact/footer
    '/socials/',               // Alternative pattern
    '/abouts',                 // getAboutAs() - CRITICAL for about pages
    '/abouts/',                // Alternative pattern
    '/sliders',                // getSlider() - CRITICAL for home page banners
    '/sliders/',               // Alternative pattern

    // === SEARCH & FILTERING ===
    '/search/',                // search() - CRITICAL for search functionality
    '/filter-',                // All filter endpoints (catch-all)
    '/filter-package/',        // getSingleDestinationFilter() - CRITICAL for package filtering
    '/filter-cruise/',         // getCruisesFilter() - CRITICAL for cruise filtering
    '/filter-excursion/',      // getExcursionsFilter() - CRITICAL for excursion filtering

    // === SPECIAL OFFERS & FEATURES ===
    '/hot-offer',              // getHotOffer() - CRITICAL for hot offers
    '/hot-offer/',             // Alternative pattern
    '/multi-country',          // Multi-country packages
    '/multi-country/',         // Alternative pattern
    '/multi-country-packages', // getMultiCoutryTours() - CRITICAL for multi-country route
    '/multi-country-packages/',// Alternative pattern

    // === LOCATION & GEOGRAPHY ===
    '/cities',                 // ExcursionCity() - CRITICAL for city data
    '/cities/',                // Alternative pattern
    '/side-photos',            // side() - CRITICAL for page photos
    '/side-photos/',           // Alternative pattern

    // === SYSTEM & UTILITIES ===
    '/lang-control',           // lang() - CRITICAL for language control
    '/getOneDestinationDetails', // getOneDestinationDetails() - CRITICAL for destination details
    '/home/',                  // Home page data
    '/getHome',                // Home page details

    // === FORMS & DOWNLOADS ===
    '/download/package/',      // postForm() - Used for package downloads

    // === TRANSLATION FILES (for i18n) ===
    '/assets/i18n/',           // TranslateHttpLoader - CRITICAL for translations
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
    '/email-subscription',     // getSubscribe() - Email subscriptions (not SEO critical)
    '/testimonials',           // getLogo() - User testimonials (can be loaded client-side)
    '/counter'                 // Counter() - Counter/stats (not SEO critical)
  ];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only intercept API calls to ask-aladdin.com
    if (!request.url.includes('api.ask-aladdin.com') && !request.url.includes('/assets/i18n/')) {
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
          timeout(12000), // 12 second timeout for SSR (increased for reliability)
          tap(event => {
            if (event instanceof HttpResponse) {
              this.transferState.set(key, event.body);
            }
          }),
          catchError(error => {
            console.error(`SSR API call failed for ${url}:`, error);

            // Return appropriate structured mock response based on endpoint type
            const mockBody = this.createMockResponseBody(url);

            return of(new HttpResponse({
              body: mockBody,
              status: 200
            }));
          })
        );
      }

      // For other API calls, return a structured mock response to prevent hydration errors
      console.log(`Returning structured mock response for API call during SSR: ${url}`);
      return of(new HttpResponse({
        body: this.createMockResponseBody(url),
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

  /**
   * Creates appropriate mock responses based on URL patterns
   * This ensures components don't crash when APIs fail during SSR
   */
  private createMockResponseBody(url: string): any {
    const message = 'Mock response during SSR';

    // Page endpoints - return page structure
    if (url.includes('/page/') || url.includes('/getSinglePageGeneral')) {
      return {
        page: [{
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
        data: [],
        message
      };
    }

    // Package/tour endpoints - return package structure
    if (url.includes('/package') || url.includes('/tour-type') || url.includes('/filter-package')) {
      return {
        data: {
          packages: [],
          category: {
            seo: {
              title: '',
              description: '',
              keywords: '',
              robots: 'index,follow'
            },
            slug: '',
            name: ''
          },
          destination: {
            slug: '',
            name: ''
          },
          destination_name: '',
          discount: 0,
          hot_offer: []
        },
        message
      };
    }

    // Global SEO endpoint - return SEO structure
    if (url.includes('/global-seo')) {
      return {
        data: [{
          title: 'Ask Aladdin Travel',
          description: '',
          keywords: '',
          robots: 'index,follow',
          facebook_description: '',
          facebook_image: '',
          facebook_title: '',
          twitter_description: '',
          twitter_image: '',
          twitter_title: '',
          live_chat_tag: ''
        }],
        message
      };
    }

    // Socials endpoint - return social structure
    if (url.includes('/socials')) {
      return {
        data: [{
          facebook: '',
          twitter: '',
          instagram: '',
          youtube: '',
          phone1: '',
          phone2: '',
          mail: '',
          address1: '',
          address2: ''
        }],
        message
      };
    }

    // Menu endpoint - return menu structure
    if (url.includes('/menus')) {
      return {
        data: {
          destinations: [],
          hot_offer_packages: [],
          city_excursions: [],
          travel_guides: [],
          categories: [],
          tour_type: []
        },
        message
      };
    }

    // Translation files
    if (url.includes('/assets/i18n/')) {
      return {}; // Empty translation object
    }

    // Default fallback for any other endpoint
    return {
      data: [],
      message,
      // Include common structures that components might expect
      seo: {
        title: '',
        description: '',
        keywords: '',
        robots: 'index,follow'
      },
      destination: {
        slug: '',
        name: ''
      },
      category: {
        slug: '',
        name: ''
      }
    };
  }
}
