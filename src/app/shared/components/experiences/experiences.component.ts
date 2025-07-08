import { Component, Input, OnChanges, OnInit, SimpleChanges, PLATFORM_ID, inject } from '@angular/core';
import { SafeHtmlComponent } from '../safe-html/safe-html.component';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css'],
    imports: [SafeHtmlComponent, TranslateModule]
})
export class ExperiencesComponent implements OnChanges {
  @Input() cruise = false;
  @Input() package = false;
  @Input() datapackage: any;

  ex: any = [];
  id: any
  cruises: any;
  cruiseID: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datapackage'] && this.isBrowser) {
      console.log('Experiences component datapackage:', this.datapackage);
      console.log('Cruise mode:', this.cruise);
      console.log('Package mode:', this.package);
    }
  }

  getSafeContent(content: any): string {
    if (!this.isBrowser || !content) {
      return '';
    }

    // Handle different content types
    if (typeof content === 'string') {
      return content;
    }

    if (typeof content === 'object' && content.content) {
      return content.content;
    }

    return String(content);
  }
}
