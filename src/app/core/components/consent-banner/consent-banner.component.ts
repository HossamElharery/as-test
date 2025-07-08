import { Component, OnInit } from '@angular/core';
 import { trigger, transition, style, animate } from '@angular/animations';
import { ConsentService } from '../../services/consent.service';

@Component({
    selector: 'app-consent-banner',
    templateUrl: './consent-banner.component.html',
    styleUrls: ['./consent-banner.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0 }))
            ])
        ])
    ],
    standalone: false
})
   export class ConsentBannerComponent implements OnInit {
    showBanner = true;
    isDevelopment = false;

    constructor(private consentService: ConsentService) {
      // Check if we're in development mode
      this.isDevelopment = window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1';
    }

    ngOnInit() {
      this.consentService.getUserConsent().subscribe(consent => {
        this.showBanner = !consent;
      });
    }

    acceptAll() {
      this.consentService.setUserConsent({
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });
      this.showBanner = false;
    }

    rejectAll() {
      this.consentService.setUserConsent({
        ad_storage: 'denied',
        analytics_storage: 'denied'
      });
      this.showBanner = false;
    }

    // // Testing methods
    // testConsent() {
    //   const consent = localStorage.getItem('userConsent');
    //   console.log('Current Consent Status:', consent ? JSON.parse(consent) : 'No consent set');

    //   // Check if GA is respecting consent
    //   // if (window['gtag']) {
    //   //   console.log('Google Analytics is loaded');
    //   //   // You can add more detailed GA checks here
    //   // } else {
    //   //   console.log('Google Analytics is not loaded');
    //   // }
    // }

    // resetConsent() {
    //   this.consentService.clearConsent();
    //   this.showBanner = true;
    //   console.log('Consent has been reset');
    // }
  }
