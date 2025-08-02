import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Count } from '../../../../core/interfaces/count';
import { isPlatformBrowser } from '@angular/common';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { CountUpModule } from 'ngx-countup';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-verfied-agent',
    imports: [CountUpModule, TranslateModule],
    templateUrl: './verfied-agent.component.html',
    styleUrl: './verfied-agent.component.scss'
})
export class VerfiedAgentComponent implements OnInit {
  // SAFE: Initialize all properties to prevent undefined errors
  countNum: Count[] = [];
  Verified: number = 0;
  Tour: number = 0;
  satisfied: number = 0;
  opts: any = {
    duration: 3,
  };

  private isBrowser: boolean;

  constructor(
    private _home: HomeserviceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Set default options
    this.opts = {
      duration: 3,
    };

    // Only load counter data in browser to prevent SSR errors
    if (this.isBrowser) {
      this.loadCounterData();
    } else {
      // Set fallback values for SSR
      this.setFallbackData();
    }
  }

  private loadCounterData(): void {
    this._home.Counter().subscribe({
      next: (res) => {
        try {
          // SAFE: Add comprehensive null checks for all property access
          this.countNum = res?.data || [];

          // SAFE: Extract specific values with fallbacks
          if (res?.data) {
            this.Verified = res.data.verified_agent || 0;
            this.Tour = res.data.tour_listed || 0;
            this.satisfied = res.data.satisfied_customer || 0;
          } else {
            this.setFallbackData();
          }
        } catch (error) {
          console.warn('Error processing counter data:', error);
          this.setFallbackData();
        }
      },
      error: (error) => {
        console.warn('Error loading counter data:', error);
        this.setFallbackData();
      }
    });
  }

  private setFallbackData(): void {
    // Set safe fallback values
    this.countNum = [];
    this.Verified = 0;
    this.Tour = 0;
    this.satisfied = 0;
  }

  // Animation removed to prevent hydration issues
}
