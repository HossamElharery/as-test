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

// ENHANCED SSR SEO initialization with immediate meta rendering
export function initializeSsrSeo(
  ssrApiService: SsrApiService,
  seoService: SeoService,
  platformId: Object
): () => Promise<void> {
  return async () => {
    if (isPlatformServer(platformId)) {
      console.log('[SSR-SERVER] ========== ENHANCED SSR SEO INIT START ==========');

      try {
        // Fetch SEO data directly with timeout
        const seoData = await ssrApiService.fetchGlobalSeoForSSR('en');

        if (seoData) {
          console.log('[SSR-SERVER] Applying SEO data:', seoData.title);
          // Apply meta tags immediately - this is critical for SSR
          seoService.setMetaTags(seoData);

          // Force immediate application of meta tags for SSR
          console.log('[SSR-SERVER] Meta tags applied for SSR rendering');
        } else {
          console.log('[SSR-SERVER] No SEO data, applying fallback');
          seoService.setFallbackMetaTags();
        }
      } catch (error) {
        console.error('[SSR-SERVER] SEO init error:', error);
        // Always apply fallback to ensure meta tags exist
        seoService.setFallbackMetaTags();
      }

      console.log('[SSR-SERVER] ========== ENHANCED SSR SEO INIT END ==========');
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

    // NOTE: SEO initialization is now handled by route resolvers
    // This ensures meta tags are applied during route resolution for proper SSR

    // EXACT MATCH: Same interceptor configuration as client
    // { provide: HTTP_INTERCEPTORS, useClass: SsrSkipApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SeoResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
