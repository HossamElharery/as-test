import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey, Optional, StateKey } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { LANGUAGE_TOKEN } from './language-token';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {

  private excludedUrls: string[] = [
    '/api/lang-control',          // Authentication APIs
    '/api/email-subscription' // APIs that don't need the language appended
  ];

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(LANGUAGE_TOKEN) private currentLang: string | null // SAFE: Make optional to prevent injection errors
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;

    // Skip non-API requests and excluded URLs
    if (!url.includes('api.ask-aladdin.com') ||
        this.excludedUrls.some(excluded => url.includes(excluded))) {
      return next.handle(request);
    }

    // SAFE: Get language with fallback
    const lang = this.currentLang || 'en';
    const key: StateKey<any> = makeStateKey<any>(`http-${request.urlWithParams}-${lang}`);

    // Server-side: Store response in transfer state
    if (isPlatformServer(this.platformId)) {
      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            try {
              this.transferState.set(key, event.body);
            } catch (error) {
              console.warn('Failed to store transfer state:', error);
            }
          }
        })
      );
    }

    // Client-side: Check transfer state first, then make request
    if (isPlatformBrowser(this.platformId)) {
      const storedResponse = this.transferState.get(key, null);

      if (storedResponse) {
        // Remove from transfer state to prevent memory leaks
        this.transferState.remove(key);
        return of(new HttpResponse({
          body: storedResponse,
          status: 200,
          statusText: 'OK'
        }));
      }
    }

    // Fallback: Make the request normally
    return next.handle(request);
  }
}
