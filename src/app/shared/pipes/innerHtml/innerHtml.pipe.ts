import {Pipe, PLATFORM_ID, inject} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
	name: 'codeHtml',
  standalone: true,
  pure: true // Important for performance and hydration consistency
})
export class innerHtmlPipe {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

	constructor(protected _sanitizer: DomSanitizer) {}

	public transform(value: string | null | undefined, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // Enhanced null/undefined handling for hydration consistency
    if (!value || value === null || value === undefined) {
      switch (type) {
        case 'html':
          return this._sanitizer.bypassSecurityTrustHtml('');
        case 'style':
          return this._sanitizer.bypassSecurityTrustStyle('');
        case 'script':
          return this._sanitizer.bypassSecurityTrustScript('');
        case 'url':
          return this._sanitizer.bypassSecurityTrustUrl('');
        case 'resourceUrl':
          return this._sanitizer.bypassSecurityTrustResourceUrl('');
        default:
          throw new Error(`Unable to bypass security for invalid type: ${type}`);
      }
    }

    // Convert to string and trim for consistency
    const stringValue = String(value).trim();
    if (!stringValue) {
      return this.transform('', type); // Recursive call with empty string
    }

		switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(stringValue);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(stringValue);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(stringValue);
			case 'url':
				return this._sanitizer.bypassSecurityTrustUrl(stringValue);
			case 'resourceUrl':
				return this._sanitizer.bypassSecurityTrustResourceUrl(stringValue);
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
	}
}
