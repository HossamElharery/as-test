import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  // Track timestamps of recent requests to each domain
  private requestTimestamps: Map<string, number[]> = new Map();
  // How many milliseconds between requests to the same domain
  private requestSpacing = 300; // 300ms between requests to same domain

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only apply rate limiting to absolute URLs that match our API
    if (!this.isApiRequest(request.url)) {
      return next.handle(request);
    }

    // Extract domain for tracking
    const domain = this.extractDomain(request.url);

    // Initialize the timestamps array for this domain if it doesn't exist
    if (!this.requestTimestamps.has(domain)) {
      this.requestTimestamps.set(domain, []);
    }

    // Get the current time
    const now = Date.now();

    // Clean up old timestamps (older than 10 seconds)
    const timestamps = this.requestTimestamps.get(domain) || [];
    const recentTimestamps = timestamps.filter(ts => now - ts < 10000);
    this.requestTimestamps.set(domain, recentTimestamps);

    // Calculate delay based on most recent request
    let delayMs = 0;
    if (recentTimestamps.length > 0) {
      const mostRecent = Math.max(...recentTimestamps);
      const elapsed = now - mostRecent;
      if (elapsed < this.requestSpacing) {
        delayMs = this.requestSpacing - elapsed;
      }
    }

    // Add the current timestamp to the list
    recentTimestamps.push(now + delayMs);
    this.requestTimestamps.set(domain, recentTimestamps);

    // If we need to delay, do so
    if (delayMs > 0) {
      console.log(`Spacing request to ${domain} by ${delayMs}ms`);
      return of(null).pipe(
        delay(delayMs),
        mergeMap(() => this.executeRequestWithRetry(request, next))
      );
    }

    // Otherwise execute immediately
    return this.executeRequestWithRetry(request, next);
  }

  private isApiRequest(url: string): boolean {
    // Check if this URL should be rate limited (only apply to API requests)
    return url.includes('api.ask-aladdin.com');
  }

  private extractDomain(url: string): string {
    // Safely extract the domain from a URL
    try {
      // For absolute URLs, try to extract the hostname
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return new URL(url).hostname;
      }
    } catch (e) {
      // Ignore errors in URL parsing
    }

    // For relative URLs or if parsing fails, use the URL itself as a domain key
    return url;
  }

  private executeRequestWithRetry(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          // Extract retry-after header if present or use a default value
          const retryAfter = error.headers.get('retry-after');
          const delayTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 5000;

          console.log(`Rate limit exceeded for ${request.url}. Retrying after ${delayTime / 1000} seconds.`);

          // Return an observable that emits after the delay, then retry the request
          return of(null).pipe(
            delay(delayTime),
            mergeMap(() => this.executeRequestWithRetry(request, next))
          );
        }

        // For other errors, just pass through
        return throwError(() => error);
      })
    );
  }
}
