import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HomeserviceService } from '../services/homeservice.service';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { tap } from 'rxjs/operators';

const SEO_DATA_KEY = makeStateKey<any>('route-seo-data');

@Injectable({
  providedIn: 'root'
})
export class SeoResolver implements Resolve<any> {

  constructor(
    private seoService: HomeserviceService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const lang = route.params['lang'] || 'en';
    const routeKey = `${SEO_DATA_KEY}_${state.url}`;

    // Check if data already exists in TransferState
    const existingData = this.transferState.get(makeStateKey(routeKey), null);
    if (existingData) {
      return of(existingData);
    }

    // Fetch SEO data and store in TransferState for hydration
    return this.seoService.globalSeo(lang).pipe(
      tap(data => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(makeStateKey(routeKey), data);
        }
      })
    );
  }
}
