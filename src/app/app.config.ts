import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
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
import { TransferStateInterceptor } from './core/languages/translation.interceptor';
// import { SkipPublicInterceptor } from './core/interceptor/skip-link/skip-link.interceptor';
import { SsrSkipApiInterceptor } from './core/interceptor/ssr-skip-api.interceptor';
import { RateLimitInterceptor } from './core/services/interceptors/rate-limit';
import { ErrorHandlingInterceptor } from './core/services/interceptors/error-handling';
import { SeoResponseInterceptor } from './core/interceptor/seo-response.interceptor';
import { PlatformService } from './core/services/platform.service';

export function initializeApp(
  platformService: PlatformService
): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      // Skip API calls during SSR
      if (platformService.isServer()) {
        console.log('Skipping app initialization during SSR');
        resolve();
        return;
      }

      // Just resolve for now, no API calls
      resolve();
    });
  };
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
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

    // Provide TranslationService and initialize language globally
    TranslationService,

    // APP_INITIALIZER to ensure that the language is set before the app loads
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [PlatformService, TranslationService],
      multi: true
    },

    // Provide current language
    {
      provide: LANGUAGE_TOKEN,
      useFactory: (translateService: TranslateService) => translateService.currentLang || 'en',
      deps: [TranslateService]
    },

    // Order matters: first SsrSkip handles SSR special logic, then SkipPublic, RateLimit.
    { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: SkipPublicInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RateLimitInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },

  ]
};
