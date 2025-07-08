import { Component, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from '../safe-html/safe-html.component';

@Component({
    imports: [RouterLink, TranslateModule, SafeHtmlComponent],
    selector: 'app-related-card-ribbon',
    templateUrl: './related-card-ribbon.component.html',
    styleUrls: ['./related-card-ribbon.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class RelatedCardRibbonComponent  implements OnInit{

  @Input() img:string=""
  @Input() des:string=""
  @Input() title:string=""
  @Input() url:string=""
  @Input() alt:string=""
  @Input() top_sale: any = 0;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() { }

  ngOnInit(): void {
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
