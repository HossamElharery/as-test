import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConsentState {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
}

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private consentKey = 'userConsent';
  private consentState = new BehaviorSubject<ConsentState | null>(null);

  constructor() {
    this.initializeConsent();
  }

  private initializeConsent() {
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem(this.consentKey);
      if (savedConsent) {
        this.consentState.next(JSON.parse(savedConsent));
      }
    }
  }

  getUserConsent() {
    return this.consentState.asObservable();
  }

  setUserConsent(consent: ConsentState) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.consentKey, JSON.stringify(consent));
      this.consentState.next(consent);
      this.updateGoogleAnalyticsConsent(consent);

      // Debug logging for testing
      console.log('Consent Updated:', consent);
      console.log('GA Command:', 'consent update', consent);
    }
  }

  private updateGoogleAnalyticsConsent(consent: ConsentState) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', consent);
    }
  }

  // Testing helper method
  clearConsent() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.consentKey);
      this.consentState.next(null);
    }
  }
}
