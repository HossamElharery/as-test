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

    // Handle different page types based on route
    if (routePath.includes('single-page')) {
      // Single page routes
      const slug = route.params['slug'];
      const cat = route.params['cat'];
      const page = route.params['page'];

      if (slug && cat && page) {
        return this.homeService.getSinglePage(slug, cat, page).pipe(
          map(result => {
            const pageData = result?.page?.[0];
            if (pageData?.seo) {
              // Apply SEO immediately during SSR
              this.seoService.updateCompleteMetaTags(pageData.seo);
            }
            return result;
          }),
          catchError(() => of(null))
        );
      }
    }

    // For routes without specific SEO handling, use global SEO
    const lang = route.params['lang'] || 'en';
    return this.homeService.globalSeo(lang);
  }
}
