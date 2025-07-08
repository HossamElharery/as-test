import { Component, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-safety-home',
    imports: [ SafeHtmlComponent],
    templateUrl: './safety-home.component.html',
    styleUrl: './safety-home.component.scss'
})
export class SafetyHomeComponent {
  @Input() data:any
  @Input() comeData:boolean=false

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSafeContent(content: string, maxLength?: number): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    const stringContent = String(content);
    return maxLength ? stringContent.slice(0, maxLength) : stringContent;
  }
}
