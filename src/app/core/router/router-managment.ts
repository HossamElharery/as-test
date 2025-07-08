import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { IRouteManager } from '../interfaces/router-manager/router-manager';
import { SeoResolver } from '../guards/seo-resolve';

@Injectable({
  providedIn: 'root',
})
export class RouteManager implements IRouteManager {
  private readonly locales = ['en', 'fr', 'de', 'es', 'ru'];

  getRoutes(): Routes {
    let routes: Routes = [
      { path: '', redirectTo: this.locales[0], pathMatch: 'full' }
    ];

    this.locales.forEach((locale) => {
      routes.push(
        {
          path: `${locale}`,
          loadChildren: () =>
            import('../../pages/home/home-routes').then((m) => m.default),
          resolve: { seoData: SeoResolver },
        },
        {
          path: `${locale}/all-destinations`,
          loadChildren: () =>
            import('../../pages/destinations/destination-routes').then((m) => m.default),
        }
      );
    });

    routes.push({ path: '**', redirectTo: `${this.locales[0]}` });
    return routes;
  }
}
