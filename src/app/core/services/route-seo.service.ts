import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { SeoService } from './seo.service';

export const ROUTE_SEO_KEY = makeStateKey<any>('route-seo');

@Injectable({
  providedIn: 'root'
})
export class RouteSeoService {
  private isServer: boolean;
  private isBrowser: boolean;

  constructor(
    private seoService: SeoService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(this.platformId);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Initialize SEO for a route component
   * This method ensures SEO tags are properly set during SSR
   */
  initializeRouteSeo(route: ActivatedRoute): void {
    // Listen for resolved SEO data
    route.data.pipe(
      filter(data => !!data['seoData']),
      tap(data => {
        const seoData = data['seoData'];

        if (seoData?.data?.[0]) {
          // Apply SEO tags immediately during SSR
          this.seoService.updateCompleteMetaTags(seoData.data[0]);

          // Store in TransferState for client hydration
          if (this.isServer) {
            const routePath = route.snapshot.url.map(segment => segment.path).join('/');
            const key = makeStateKey(`route-seo-${routePath}`);
            this.transferState.set(key, seoData.data[0]);
          }
        }
      })
    ).subscribe();
  }

  /**
   * Set page-specific SEO data
   * This method can be called directly by components with their own SEO data
   */
  setPageSeo(seoData: any): void {
    if (seoData) {
      // Use the comprehensive update method that handles all meta tags
      this.seoService.updateCompleteMetaTags(seoData);
    }
  }
}
