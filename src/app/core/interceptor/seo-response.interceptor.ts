import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SeoService } from '../services/seo.service';

/**
 * ENHANCED SEO Response Interceptor
 *
 * Intercepts all HTTP responses and automatically applies SEO data when available.
 * This ensures dynamic SEO meta tags are applied across the application without
 * requiring each component to manually handle SEO updates.
 *
 * Looks for SEO data in multiple locations within API responses:
 * - response.seo (direct SEO object)
 * - response.data[0].seo (nested in data array)
 * - response.page[0].seo (nested in page array)
 * - response.category.seo (nested in category object)
 */
@Injectable()
export class SeoResponseInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (!(event instanceof HttpResponse)) return;

        const body = event.body || {};

        // Look for SEO data in various locations within the response
        let seoPayload = null;

        // Check direct seo property
        if (body.seo) {
          seoPayload = body.seo;
        }
        // Check data[0].seo (common pattern)
        else if (body.data && Array.isArray(body.data) && body.data[0]?.seo) {
          seoPayload = body.data[0].seo;
        }
        // Check page[0].seo (for page endpoints)
        else if (body.page && Array.isArray(body.page) && body.page[0]?.seo) {
          seoPayload = body.page[0].seo;
        }
        // Check category.seo (for category endpoints)
        else if (body.category?.seo) {
          seoPayload = body.category.seo;
        }

        // Apply SEO data if found
        if (seoPayload) {
          try {
            const seo = this.injector.get(SeoService);
            seo.updateCompleteMetaTags(seoPayload);
          } catch (error) {
            console.error('SEO Response Interceptor: Error applying SEO data', error);
          }
        }
      })
    );
  }
}
