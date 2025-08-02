import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from '../safe-html/safe-html.component';
declare const $: any;

@Component({
    imports: [TranslateModule, SafeHtmlComponent],
    selector: 'app-prices-policy',
    templateUrl: './prices-policy.component.html',
    styleUrls: ['./prices-policy.component.css']
})
export class PricesPolicyComponent implements OnInit {

  @Input() price_policy:any
  @Input() payment_policy:string=""
  @Input() repeated_travellers:string=""
  @Input() travel_schedule:string=""
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      $("#accordion").on("hide.bs.collapse show.bs.collapse", (e: { target: any; }) => {
        $(e.target)
          .prev()
          .find("i:last-child")
          .toggleClass("fa-minus fa-plus");
      });
    }
  }

  getSafeContent(content: string, maxLength?: number): string {
    // Always return empty string for null/undefined to ensure consistent DOM
    if (!content || content === null || content === undefined) {
      return '';
    }

    // Convert to string and trim
    const stringContent = String(content).trim();
    if (!stringContent) {
      return '';
    }

    // Apply maxLength if specified
    const finalContent = maxLength ? stringContent.slice(0, maxLength) : stringContent;

    // Return the content - SafeHtmlComponent will handle sanitization
    return finalContent;
  }
}
