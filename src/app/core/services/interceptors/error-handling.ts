import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only apply this in SSR mode
        if (typeof window === 'undefined') {
          console.error(`API request failed during SSR: ${request.url}`);

          // Create a mock response based on the URL
          const mockResponse: any = this.createMockResponse(request.url);

          // Return the mock response
          return of(new HttpResponse<any>({
            body: mockResponse,
            status: 200,
            statusText: 'OK',
            url: request.url
          }));
        }

        // In browser mode, just pass through the error
        return throwError(() => error);
      })
    );
  }

  /**
   * Creates appropriate mock responses based on URL patterns
   */
  private createMockResponse(url: string): any {
    // Default empty response
    const emptyResponse = { data: [] };

    // Check for specific API endpoints and create appropriate mock responses
    if (url.includes('/menus/')) {
      return {
        data: {
          destinations: [],
          hot_offer_packages: [],
          city_excursions: [],
          travel_guides: [],
          categories: [],
          tour_type: []
        }
      };
    }

    if (url.includes('/destinations/')) {
      return { data: [] };
    }

    if (url.includes('/global-seo/')) {
      return {
        data: [{
          title: 'Ask Aladdin',
          description: '',
          keywords: '',
          robots: '',
          facebook_description: '',
          facebook_image: '',
          og_title: '',
          twitter_description: '',
          twitter_image: '',
          twitter_title: ''
        }]
      };
    }

    if (url.includes('/socials/')) {
      return { data: { id: 1, facebook: '', twitter: '', instagram: '', youtube: '', flickr: '', linkedin: '', pinterest: '', address1: '', address2: '', phone1: '', phone2: '', mail: '' } };
    }

    if (url.includes('/page/general/')) {
      return {
        page: {
          name: '',
          slug: '',
          description: '',
          page_title: '',
          thumb: '',
          related_pages: []
        }
      };
    }

    if (url.includes('/side-photos/')) {
      return { data: [] };
    }

    // Default fallback
    return emptyResponse;
  }
}
