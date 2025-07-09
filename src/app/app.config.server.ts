import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './core/services/translate/language.service';
import { SeoService } from './core/services/seo.service';
import { SeoResponseInterceptor } from './core/interceptor/seo-response.interceptor';
import { LANGUAGE_TOKEN } from './core/languages/language-token';
import { SsrSkipApiInterceptor } from './core/interceptor/ssr-skip-api.interceptor';
import { RateLimitInterceptor } from './core/services/interceptors/rate-limit';
import { ErrorHandlingInterceptor } from './core/services/interceptors/error-handling';

export function initializeTranslation(translationService: TranslationService): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      translationService.initializeLanguage();
      resolve();
    });
  };
}

// CRITICAL: This must complete BEFORE rendering starts
export function initializeSSRSeo(seoService: SeoService, translateService: TranslateService): () => Promise<void> {
  return () => {
    console.log('Starting SSR SEO initialization...');
    const lang = translateService.currentLang || 'en';

    return seoService.globalSeoForSSR(lang)
      .then(() => {
        console.log('SSR SEO initialization completed successfully');
      })
      .catch((error) => {
        console.error('SSR SEO initialization failed:', error);
        // Set fallback meta tags to prevent empty tags
        seoService.setFallbackMetaTags();
      });
  };
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
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

    // STEP 1: Initialize translation first
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslation,
      deps: [TranslationService],
      multi: true
    },

    // STEP 2: Initialize SEO data after translation is ready
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSSRSeo,
      deps: [SeoService, TranslateService],
      multi: true
    },

    {
      provide: LANGUAGE_TOKEN,
      useFactory: (translateService: TranslateService) => translateService.currentLang || 'en',
      deps: [TranslateService]
    },

    { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RateLimitInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
