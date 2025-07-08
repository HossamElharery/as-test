import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SeoService } from '../services/seo.service';

/**
 * Intercepts all HTTP responses. If the response body contains an `seo` object
 * (either at root level or inside `data[0]`), it automatically updates meta tags
 * via `SeoService`. This ensures dynamic SEO data is applied during SSR *and*
 * on the browser without requiring each component to call `SeoService` manually.
 */
@Injectable()
export class SeoResponseInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (!(event instanceof HttpResponse)) return;

        const body = event.body || {};
        // Possible locations for SEO payload
        const seoPayload = body.seo || body?.data?.[0]?.seo;
        if (seoPayload) {
          const seo = this.injector.get(SeoService);
          seo.updateCompleteMetaTags(seoPayload);
        }
      })
    );
  }
}
