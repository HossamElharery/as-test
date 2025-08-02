
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { catchError, timeout } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private currentLang: string = 'en'; // Default language

  constructor(
    private http: HttpClient,
    @Optional() private translate: TranslateService, // SAFE: Optional to prevent injection errors
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    console.log('LayoutService initialized safely');
  }

  // SAFE: Get current language with comprehensive fallbacks
  private getCurrentLanguage(): string {
    try {
      if (this.translate?.currentLang) {
        return this.translate.currentLang;
      }
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('currentLang') || 'en';
      }
      return 'en';
    } catch (error) {
      console.warn('Error getting current language:', error);
      return 'en';
    }
  }

    // ROBUST: Create fallback data for failed API calls
  private createFallbackData(type: string): Observable<any> {
    const fallbackData: { [key: string]: any } = {
      socials: {
        data: [{ // ENSURE this is an array
          id: 1,
          facebook: 'https://www.facebook.com/AskAladdin',
          twitter: 'https://twitter.com/AskAladdin',
          instagram: 'https://instagram.com/askaladdin/',
          youtube: 'https://www.youtube.com/channel/UCbPdpZ-nSRXUP6rmNm8120A',
          flickr: '',
          linkedin: 'https://www.linkedin.com/company/ask-aladdin/',
          pinterest: 'https://in.pinterest.com/askaladdin/',
          address1: 'Cairo, Egypt',
          address2: 'Giza, Egypt',
          phone1: '+20 115 666 4190',
          phone2: '+20 106 508 4987',
          mail: 'info@ask-aladdin.com',
          created_at: '',
          updated_at: ''
        }]
      },
      destinations: {
        data: [ // ENSURE this is an array
          {
            id: 1,
            name: "Egypt",
            slug: "egypt",
            description: "Discover ancient Egypt",
            banner: "egypt-banner.jpg"
          }
        ]
      },
      menus: {
        data: {
          destinations: [ // ENSURE proper nested structure
            [{
              id: 1,
              name: "Egypt",
              slug: "egypt",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ],
          hot_offer_packages: [
            [{
              id: 1,
              name: "Hot Offers",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ],
          city_excursions: [
            [{
              id: 1,
              name: "City Tours",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ],
          travel_guides: [
            [{
              id: 1,
              name: "Travel Guides",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ],
          categories: [
            [{
              id: 1,
              name: "Categories",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ],
          tour_type: [
            [{
              id: 1,
              name: "Tour Types",
              destination: { slug: "egypt", name: "Egypt" }
            }]
          ]
        }
      },
      'lang-control': {
        data: [{ // ENSURE this is an array
          english: true,
          french: false,
          spanish: false,
          deutsch: false,
          russian: false,
          italian: false
        }]
      },
      'destination-details': {
        data: [{ // ENSURE this is an array
          categories: [],
          destination: { slug: '', banner: '' }
        }]
      },
      'search': {
        data: {
          blogs: [],
          destinations: [],
          package: [],
          cruise: [],
          excursion: [],
          category: [],
          faq: [],
          hotel: [],
          page: [],
          travel_guide: []
        }
      },
      'excursions': {
        data: {
          destination: [{
            id: 1,
            name: "Egypt",
            slug: "egypt"
          }]
        }
      }
    };

    console.log(`Returning fallback data for ${type}`);
    return of(fallbackData[type] || { data: [] });
  }

  // API call wrapper with comprehensive error handling - REVERTED TO ORIGINAL URLs
  private makeApiCall(endpoint: string, fallbackType: string): Observable<any> {
    try {
      const lang = this.getCurrentLanguage();
      // ORIGINAL URL PATTERN - DO NOT CHANGE
      const url = `${environment.url}${endpoint}/${lang}`;

      console.log(`SSR API Call: ${url}`);

      return this.http.get(url).pipe(
        timeout(15000),
        catchError((error) => {
          console.error(`API request failed for ${url}:`, error);
          return this.createFallbackData(fallbackType);
        })
      );
    } catch (error) {
      console.error('Error in makeApiCall:', error);
      return this.createFallbackData(fallbackType);
    }
  }

  getSocials(): Observable<any> {
    return this.makeApiCall('socials', 'socials');
  }

  getAlldestination(): Observable<any> {
    return this.makeApiCall('destinations', 'destinations');
  }

  getMegaMenu(): Observable<any> {
    return this.makeApiCall('menus', 'menus');
  }

  getLanguageControl(): Observable<any> {
    try {
      // ORIGINAL: lang-control API does not take language parameter
      const url = `${environment.url}lang-control`;

      console.log(`SSR API Call: ${url}`);

      return this.http.get(url).pipe(
        timeout(15000),
        catchError((error) => {
          console.error(`API request failed for ${url}:`, error);
          return this.createFallbackData('lang-control');
        })
      );
    } catch (error) {
      console.error('Error in getLanguageControl:', error);
      return this.createFallbackData('lang-control');
    }
  }

  // METHOD USED BY HEADER: Get language control data
  lang(): Observable<any> {
    return this.getLanguageControl();
  }

  // Additional methods for specific API calls
  ExcursionCity(slug: string): Observable<any> {
    try {
      const lang = this.getCurrentLanguage();
      // ORIGINAL: Use destination excursions pattern
      const url = `${environment.url}destination/excursions/${slug}/${lang}`;

      return this.http.get(url).pipe(
        timeout(15000),
        catchError((error) => {
          console.error('ExcursionCity failed:', error);
          return this.createFallbackData('excursions');
        })
      );
    } catch (error) {
      console.error('Error in ExcursionCity:', error);
      return this.createFallbackData('excursions');
    }
  }

  getOneDestinationDetails(slug: string): Observable<any> {
    try {
      const lang = this.getCurrentLanguage();
      // ORIGINAL: Use categories pattern
      const url = `${environment.url}categories/${slug}/${lang}`;

      return this.http.get(url).pipe(
        timeout(15000),
        catchError((error) => {
          console.error('getOneDestinationDetails failed:', error);
          return this.createFallbackData('destination-details');
        })
      );
    } catch (error) {
      console.error('Error in getOneDestinationDetails:', error);
      return this.createFallbackData('destination-details');
    }
  }

  // MISSING METHODS: Adding methods called by header and footer components

    getSubscribe(emailValue: any): Observable<any> {
    try {
      const url = `${environment.url}newsletter/subscribe`;
      // Extract email from the value object if it's a form value
      const email = typeof emailValue === 'string' ? emailValue : emailValue?.email || '';
      const payload = { email };

      return this.http.post(url, payload).pipe(
        timeout(15000),
        catchError((error) => {
          console.error('getSubscribe failed:', error);
          return of({ success: false, message: 'Subscription failed' });
        })
      );
    } catch (error) {
      console.error('Error in getSubscribe:', error);
      return of({ success: false, message: 'Subscription failed' });
    }
  }

  search(term: string): Observable<any> {
    try {
      const lang = this.getCurrentLanguage();
      const url = `${environment.url}search/${term}/${lang}`;

      return this.http.get(url).pipe(
        timeout(15000),
        catchError((error) => {
          console.error('search failed:', error);
          return this.createFallbackData('search');
        })
      );
    } catch (error) {
      console.error('Error in search:', error);
      return this.createFallbackData('search');
    }
  }
}
