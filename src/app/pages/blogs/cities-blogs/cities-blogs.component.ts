import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-cities-blogs',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        FormsModule,
        innerHtmlPipe,
        NgStyle,
        SlicePipe
    ],
    templateUrl: './cities-blogs.component.html',
    styleUrls: ['./cities-blogs.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class CitiesBlogsComponent implements OnInit {
  packagesNames: destination[] = [];
  packageContent: destination[] = [];
  loading:boolean=true
  description: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private _destinationPack: HomeserviceService , private active:ActivatedRoute , private seo:SeoService , private schema :SchemaInjectionService) {}

  ngOnInit(): void {
     this._destinationPack.getSinglePageGeneral(`all-blogs`).subscribe(res => {
       this.seo.data.title = res.page[0].seo.title
       this.seo.data.description =  res.page[0].seo.description
       this.seo.data.robots =  res.page[0].seo.robots
       this.seo.data.keywords = res.page[0].seo.keywords
       this.seo.data.fbDes =  res.page[0].seo.facebook_description
       this.seo.data.fbImg =  res.page[0].seo.facebook_image
       this.seo.data.fbTit =  res.page[0].seo.facebook_title
       this.seo.data.twitterDes =  res.page[0].seo.twitter_description
       this.seo.data.twitterImage =  res.page[0].seo.twitter_image
       this.seo.data.twitterTit =  res.page[0].seo.twitter_title
       if (res.page[0].seo.schema) {
        this.schema.injectSchema(res.page[0].seo.schema)
      }
       this.seo.updateTags(this.seo.data)
       this.description=res.page[0].description
     })
    this._destinationPack
    .getAlldestination()
    .subscribe((result) => {
      this.packagesNames = result.data
    });

    this._destinationPack.getOneDestinationDetails(1).subscribe((res) => {
      this.packageContent = res.data[0].categories;
       this.loading=false

    });

  }
  numSequence(n: number): Array<number> {
    return Array(n);
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
