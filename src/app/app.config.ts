import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { provideClientHydration } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LANGUAGE_TOKEN } from './core/languages/language-token';
import { TranslationService } from './core/services/translate/language.service';
// import { SsrSkipApiInterceptor } from './core/interceptor/ssr-skip-api.interceptor';
import { ErrorHandlingInterceptor } from './core/services/interceptors/error-handling';
import { SeoResponseInterceptor } from './core/interceptor/seo-response.interceptor';
import { PlatformService } from './core/services/platform.service';
import { SeoService } from './core/services/seo.service';
import { LayoutService } from './layout/services/layout.service';
import { HomeserviceService } from './core/services/homeservice.service';

// CRITICAL: HttpLoaderFactory for client-side translation loading
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// ROBUST: Safe language token provider that never fails
export function provideLanguageToken(): string {
  // Always return 'en' during hydration to prevent injection errors
  return 'en';
}

// SAFE: Minimal app initialization that never fails
export function initializeApp(): Promise<void> {
  return Promise.resolve(); // Always resolve immediately to prevent blocking
}

export const appConfig: ApplicationConfig = {
  providers: [
    // STEP 1: Core providers that must come first
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),

    // STEP 2: Essential services
    PlatformService,
    TranslationService,
    SeoService,
    LayoutService,
    HomeserviceService,

    // STEP 3: Translation module configuration
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en'
      })
    ),

    // STEP 4: Simple language token that never fails
    {
      provide: LANGUAGE_TOKEN,
      useFactory: provideLanguageToken,
      deps: [] // No dependencies to prevent injection errors
    },

    // STEP 5: Minimal app initializer
    provideAppInitializer(() => initializeApp()),

    // STEP 6: Interceptors (minimal set to prevent conflicts)
    // { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
  ]
};
