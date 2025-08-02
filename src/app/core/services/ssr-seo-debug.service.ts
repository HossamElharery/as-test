import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SsrSeoDebugService {
  private isServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    this.isServer = isPlatformServer(this.platformId);
  }

  async testSsrApiCall(): Promise<void> {
    if (!this.isServer) {
      console.log('[SSR-DEBUG] Not on server, skipping test');
      return;
    }

    console.log('[SSR-DEBUG] Testing API connectivity from SSR server...');
    console.log('[SSR-DEBUG] Environment URL:', environment.url);

    const testUrl = `${environment.url}global-seo/en`;
    console.log('[SSR-DEBUG] Test URL:', testUrl);

    try {
      console.time('[SSR-DEBUG] API Call Duration');
      const response = await firstValueFrom(
        this.http.get(testUrl).pipe(timeout(10000))
      );
      console.timeEnd('[SSR-DEBUG] API Call Duration');

      console.log('[SSR-DEBUG] API Response Status: SUCCESS');
      console.log('[SSR-DEBUG] Response data:', JSON.stringify(response).substring(0, 200) + '...');

      if (response && (response as any).data) {
        console.log('[SSR-DEBUG] SEO Data found in response');
      } else {
        console.log('[SSR-DEBUG] WARNING: No SEO data in response');
      }
    } catch (error: any) {
      console.timeEnd('[SSR-DEBUG] API Call Duration');
      console.error('[SSR-DEBUG] API Call FAILED');
      console.error('[SSR-DEBUG] Error Type:', error.name);
      console.error('[SSR-DEBUG] Error Message:', error.message);
      console.error('[SSR-DEBUG] Error Stack:', error.stack);

      if (error.name === 'TimeoutError') {
        console.error('[SSR-DEBUG] API call timed out - check network connectivity');
      }
    }
  }

  logSsrState(component: string, message: string, data?: any): void {
    const prefix = this.isServer ? '[SSR-SERVER]' : '[SSR-CLIENT]';
    console.log(`${prefix} [${component}] ${message}`, data || '');
  }
}
