import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-book-home',
    imports: [  SafeHtmlComponent],
    templateUrl: './book-home.component.html',
    styleUrl: './book-home.component.scss'
})
export class BookHomeComponent {
  @Input() data:any
  @Input() isComeData:any

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() { }

  ngOnInit(): void {
  }

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




