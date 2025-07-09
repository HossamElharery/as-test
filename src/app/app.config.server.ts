import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './core/services/translate/language.service';
import { SeoService } from './core/services/seo.service';
// import { SkipPublicInterceptor } from './core/interceptor/skip-link/skip-link.interceptor';
import { SeoResponseInterceptor } from './core/interceptor/seo-response.interceptor';
import { LANGUAGE_TOKEN } from './core/languages/language-token';
import { SsrSkipApiInterceptor } from './core/interceptor/ssr-skip-api.interceptor';
import { RateLimitInterceptor } from './core/services/interceptors/rate-limit';
import { ErrorHandlingInterceptor } from './core/services/interceptors/error-handling';


export function initializeApp(translationService: TranslationService): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      translationService.initializeLanguage();
      resolve();
    });
  };
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
  // return new TranslateHttpLoader(httpClient, '../assets/i18n/');
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
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
    provideServerRendering(),
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslationService],
      multi: true
    },
    // FIXED: Only change this part - now properly waits for API completion
    {
      provide: APP_INITIALIZER,
      useFactory: (seo: SeoService, translate: TranslateService) => {
        return () => {
          // Use the new SSR method that returns a Promise
          return seo.globalSeoForSSR(translate.currentLang || 'en')
            .catch((error) => {
              console.error('SEO initialization failed during SSR:', error);
              // Don't block SSR even if SEO fails
            });
        };
      },
      deps: [SeoService, TranslateService],
      multi: true
    },
    {
      provide: LANGUAGE_TOKEN,
      useFactory: (translateService: TranslateService) => translateService.currentLang || 'en',
      deps: [TranslateService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: SkipPublicInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RateLimitInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
