import { AfterViewChecked, Component, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SafeHtmlComponent } from '../safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
    imports: [RouterLink, CarouselModule, TranslateModule, SafeHtmlComponent],
    selector: 'app-related-card',
    templateUrl: './related-card.component.html',
    styleUrls: ['./related-card.component.css']
})
export class RelatedCardComponent implements OnInit, AfterViewChecked{

  @Input() img:string=""
  @Input() des:string=""
  @Input() title:string=""
  @Input() url:string=""
  @Input() alt:string=""

  loading:boolean=true
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() { }

  ngOnInit(): void {
  }

   ngAfterViewChecked() {
    // ...
    this.loading=false

  }

  getSafeContent(content: string): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    return content;
  }

}
