import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HomeserviceService } from '../services/homeservice.service';
import { SeoService } from '../services/seo.service';

@Injectable({
  providedIn: 'root'
})
export class PageSeoResolver implements Resolve<any> {

  constructor(
    private homeService: HomeserviceService,
    private seoService: SeoService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const routePath = route.routeConfig?.path || '';
    const lang = route.params['lang'] || 'en';

    console.log(`[RESOLVER] Resolving SEO for path: "${routePath}", lang: ${lang}`);

    // Handle different page types based on route
    if (routePath.includes('single-page')) {
      // Single page routes
      const slug = route.params['slug'];
      const cat = route.params['cat'];
      const page = route.params['page'];

      if (slug && cat && page) {
        console.log(`[RESOLVER] Fetching single page SEO: ${slug}/${cat}/${page}`);
        return this.homeService.getSinglePage(slug, cat, page).pipe(
          map(result => {
            const pageData = result?.page?.[0];
            if (pageData?.seo) {
              console.log(`[RESOLVER] Applying single page SEO:`, pageData.seo.title);
              // Apply SEO immediately during SSR
              this.seoService.updateCompleteMetaTags(pageData.seo);
            }
            return result;
          }),
          catchError(() => of(null))
        );
      }
    }

    // For home page and other routes, use global SEO
    console.log(`[RESOLVER] Fetching global SEO for lang: ${lang}`);
    return this.homeService.globalSeo(lang).pipe(
      map(result => {
        console.log(`[RESOLVER] Global SEO result:`, result?.data?.[0]?.title || 'No title');
        if (result?.data?.[0]) {
          // Apply SEO during SSR for immediate rendering
          this.seoService.setMetaTags(result.data[0]);
        }
        return result;
      }),
      catchError(error => {
        console.error(`[RESOLVER] Error fetching global SEO:`, error);
        return of(null);
      })
    );
  }
}
