import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {

  private excludedUrls: string[] = [
    '/api/lang-control',          // Authentication APIs
    '/api/email-subscription' // APIs that don't need the language appended
  ];

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('CURRENT_LANG') private currentLang: string // Inject the language token instead of TranslationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Append the language to the URL
    const shouldExclude = this.excludedUrls.some(url => req.url.includes(url));

    // If the URL is excluded, proceed with the original request
    if (shouldExclude) {
      return next.handle(req);
    }
    let modifiedUrl = req.url;
    if (!req.url.includes(`/${this.currentLang}`)) {
      modifiedUrl = `${req.url}/${this.currentLang}`;
    }

    const modifiedReq = req.clone({ url: modifiedUrl });

    const key = makeStateKey<HttpResponse<any>>(modifiedReq.urlWithParams);

    // Server-side logic for caching
    if (isPlatformServer(this.platformId)) {
      return next.handle(modifiedReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.transferState.set(key, event.body);
          }
        })
      );
    }

    // Client-side logic for retrieving cached response
    if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(key)) {
      const cachedResponse = this.transferState.get(key, null);
      this.transferState.remove(key); // Prevent stale data
      return of(new HttpResponse({ body: cachedResponse }));
    }

    return next.handle(modifiedReq);
  }
}
