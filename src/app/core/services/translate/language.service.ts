import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly localStorageLangKey = 'appLanguage'; // Key for localStorage
  private readonly defaultLang = 'en';
  private readonly supportedLanguages = ['en', 'fr', 'es', 'de', 'ru'];

  constructor(
    private translateService: TranslateService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  initializeLanguage() {
    let currentLang: string = this.defaultLang;

    // Check if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      // First, check if language is present in the URL using Location service
      const urlLang = this.getLangFromUrl();

      if (urlLang && this.supportedLanguages.includes(urlLang)) {
        currentLang = urlLang;
        localStorage.setItem(this.localStorageLangKey, currentLang);
      } else {
        // If not in the URL, check localStorage
        const storedLang = localStorage.getItem(this.localStorageLangKey);
        if (storedLang && this.supportedLanguages.includes(storedLang)) {
          currentLang = storedLang;
        } else {
          // If not in localStorage, fallback to browser language or default
          const browserLang = this.translateService.getBrowserLang();
          currentLang = browserLang && this.supportedLanguages.includes(browserLang)
            ? browserLang
            : this.defaultLang;

          localStorage.setItem(this.localStorageLangKey, currentLang);
        }
      }
    }

    // Set the language using TranslateService
    this.translateService.setDefaultLang(this.defaultLang);
    this.translateService.use(currentLang);

    return currentLang;
  }

  switchLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId) && this.supportedLanguages.includes(lang)) {
      localStorage.setItem(this.localStorageLangKey, lang);
      this.translateService.use(lang);
    }
  }

  getCurrentLang(): string {
    return this.translateService.currentLang || this.defaultLang;
  }

  getLangFromUrl(): string | null {
    // Get the full URL path using Location
    const path = this.location.path();
    const urlSegments = path.split('/');
    const langSegment = urlSegments.length > 1 ? urlSegments[1] : null;

    // Check if the segment is a supported language
    if (langSegment && this.supportedLanguages.includes(langSegment)) {
      return langSegment;
    }

    return null;
  }
}
