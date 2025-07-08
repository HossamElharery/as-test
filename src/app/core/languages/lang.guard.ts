import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LangGuard implements CanActivate {
  private supportedLanguages = ['en', 'fr', 'es', 'de', 'ru']; // Supported languages

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const lang = route.params['lang'];
    // Validate the language parameter
    if (this.supportedLanguages.includes(lang)) {
      return true;
    } else {
      // If the language is not valid, redirect to the default route
      this.router.navigate(['/']);
      return false;
    }
  }
}
