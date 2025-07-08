import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Cruises } from '../../../core/interfaces/cruises';
import { innerHtmlPipe } from "../../pipes/innerHtml/innerHtml.pipe";
import { SafeHtmlComponent } from "../safe-html/safe-html.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
    imports: [RouterLink, CarouselModule, TranslateModule, innerHtmlPipe, SafeHtmlComponent],
    selector: 'app-splander',
    templateUrl: './splander.component.html',
    styleUrls: ['./splander.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class SplanderComponent implements OnInit {
  @Input() cruise = false;
  @Input() package = false;
  @Input() excur = false;
  @Input() splander:any
  guide:any = [];
  id:any;
  selectTrue = true
  imageFalse= '../../../../assets/imgs/Wrong.png';
  imageTrue='../../../../assets/imgs/right.png';
  num : any;
  cruis: any;
  days: Cruises[] = [];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Ensure splander data is properly initialized
    if (!this.splander) {
      this.splander = {
        day_data: [],
        three_nights: [],
        four_nights: [],
        seven_nights: [],
        every_day_3: '',
        every_day_4: '',
        every_day_7: ''
      };
    }

    // Ensure arrays are properly initialized
    this.splander.day_data = this.splander.day_data || [];
    this.splander.three_nights = this.splander.three_nights || [];
    this.splander.four_nights = this.splander.four_nights || [];
    this.splander.seven_nights = this.splander.seven_nights || [];
  }

  // Helper method to safely get day summary
  getSafeDaySummary(day: any): string {
    // Always return empty string for null/undefined to ensure consistent DOM
    if (!day || !day.day_summary || day.day_summary === null || day.day_summary === undefined) {
      return '';
    }

    // Convert to string and trim for consistency
    const content = String(day.day_summary).trim();

    // Return empty string if content is empty after trimming
    if (!content) {
      return '';
    }

    return content;
  }

  // Helper method to check if day data exists
  hasDayData(dayArray: any[]): boolean {
    return Array.isArray(dayArray) && dayArray.length > 0;
  }

  // Helper method to safely get array length
  getSafeArrayLength(arr: any[]): number {
    return Array.isArray(arr) ? arr.length : 0;
  }
}
