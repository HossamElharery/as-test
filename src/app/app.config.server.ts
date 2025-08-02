import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom, inject, TransferState, PLATFORM_ID } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { isPlatformServer } from '@angular/common';
import { appConfig } from './app.config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LANGUAGE_TOKEN } from './core/languages/language-token';
// import { SsrSkipApiInterceptor } from './core/interceptor/ssr-skip-api.interceptor';
import { ErrorHandlingInterceptor } from './core/services/interceptors/error-handling';
import { SeoResponseInterceptor } from './core/interceptor/seo-response.interceptor';
import { TranslateServerLoader } from './core/loaders/translate-server.loader';
import { TranslationService } from './core/services/translate/language.service';
import { SeoService } from './core/services/seo.service';
import { PlatformService } from './core/services/platform.service';
import { LayoutService } from './layout/services/layout.service';
import { HomeserviceService } from './core/services/homeservice.service';
import { SsrSeoDebugService } from './core/services/ssr-seo-debug.service';
import { SsrApiService } from './core/services/ssr-api.service';


// SERVER-SIDE: HttpLoaderFactory for server
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateServerLoader();
}

// SAFE: Minimal language token provider
export function provideLanguageToken(): string {
  return 'en'; // Default fallback for SSR
}

// DIRECT SSR SEO initialization
export function initializeSsrSeo(
  ssrApiService: SsrApiService,
  seoService: SeoService,
  platformId: Object
): () => Promise<void> {
  return async () => {
    if (isPlatformServer(platformId)) {
      console.log('[SSR-SERVER] ========== DIRECT SSR SEO INIT START ==========');

      try {
        // Fetch SEO data directly
        const seoData = await ssrApiService.fetchGlobalSeoForSSR('en');

        if (seoData) {
          console.log('[SSR-SERVER] Applying SEO data:', seoData.title);
          // Apply meta tags immediately
          seoService.setMetaTags(seoData);
        } else {
          console.log('[SSR-SERVER] No SEO data, applying fallback');
          seoService.setFallbackMetaTags();
        }
      } catch (error) {
        console.error('[SSR-SERVER] SEO init error:', error);
        seoService.setFallbackMetaTags();
      }

      console.log('[SSR-SERVER] ========== DIRECT SSR SEO INIT END ==========');
    }
  };
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideServerRendering(),

    // EXACT MATCH: Same service order as client
    PlatformService,
    TranslationService,
    SeoService,
    LayoutService,
    HomeserviceService,

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

    // EXACT MATCH: Same language token configuration as client
    {
      provide: LANGUAGE_TOKEN,
      useFactory: provideLanguageToken,
      deps: [] // No dependencies to prevent injection errors
    },

    // SSR-specific SEO initializer
    provideAppInitializer(() => {
      const ssrApiService = inject(SsrApiService);
      const seoService = inject(SeoService);
      const platformId = inject(PLATFORM_ID);
      return initializeSsrSeo(ssrApiService, seoService, platformId)();
    }),

    // EXACT MATCH: Same interceptor configuration as client
    // { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
