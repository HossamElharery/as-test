import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeserviceService } from '../services/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class SeoResolver implements Resolve<any> {

  constructor(private seoService: HomeserviceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // Fetch SEO data before navigating to the route
    const lang = route.params['lang']
    return this.seoService.globalSeo(lang || 'en');
  }
}
