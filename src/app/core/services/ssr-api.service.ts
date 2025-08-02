import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of, firstValueFrom } from 'rxjs';
import { tap, timeout, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const SSR_SEO_KEY = makeStateKey<any>('ssr-seo-data');

@Injectable({
  providedIn: 'root'
})
export class SsrApiService {
  private isServer: boolean;

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(this.platformId);
  }

  /**
   * Fetches global SEO data with proper SSR handling
   */
  async fetchGlobalSeoForSSR(lang: string): Promise<any> {
    console.log(`[${this.isServer ? 'SSR-SERVER' : 'SSR-CLIENT'}] fetchGlobalSeoForSSR called`);

    // Check TransferState first
    const cachedData = this.transferState.get(SSR_SEO_KEY, null);
    if (cachedData) {
      console.log(`[${this.isServer ? 'SSR-SERVER' : 'SSR-CLIENT'}] Using cached SEO data from TransferState`);
      return cachedData;
    }

    // Only fetch on server
    if (!this.isServer) {
      console.log('[SSR-CLIENT] Skipping API call - should use TransferState');
      return null;
    }

    const url = `${environment.url}global-seo/${lang}`;
    console.log(`[SSR-SERVER] Fetching SEO from: ${url}`);

    try {
      const response = await firstValueFrom(
        this.http.get(url).pipe(
          timeout(environment.ssrApiTimeout || 2000),
          tap(res => {
            console.log('[SSR-SERVER] API response received');
          }),
          catchError(error => {
            console.error('[SSR-SERVER] API call failed:', error.message);
            return of(null);
          })
        )
      );

      if (response && (response as any).data) {
        const seoData = (response as any).data[0];
        console.log('[SSR-SERVER] Storing SEO data in TransferState');
        this.transferState.set(SSR_SEO_KEY, seoData);
        return seoData;
      }

      return null;
    } catch (error) {
      console.error('[SSR-SERVER] Unexpected error:', error);
      return null;
    }
  }
}
