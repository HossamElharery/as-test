import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';

@Component({
    selector: 'app-all-travelguide',
    imports: [
        CommonModule,
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        SafeHtmlComponent,
    ],
    templateUrl: './all-travelguide.component.html',
    styleUrls: ['./all-travelguide.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class AllTravelguideComponent implements OnInit,OnDestroy {
  private unSub!:Subscription
  GuidesNames: destination[] = [];
  GuidesContent: any = [];
  id: any;
  loading:boolean=true
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private _destinationPack: HomeserviceService , private seo :SeoService , private schema:SchemaInjectionService) {}
  ngOnInit(): void {


      this.unSub=   this._destinationPack.getAlldestination().subscribe((result) =>{

        this.GuidesNames = result.data;

        this.loading=false
      });
    this._destinationPack.getOneDestinationDetails(5).subscribe((res) => {
      this.GuidesContent = res.data[0].categories[0];


    });
    this._destinationPack.getSinglePageGeneral(`all-travel-guides`).subscribe(res => {

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
      this.seo.updateTags(this.seo.data)
      if (res.page[0].seo.schema) {
        this.schema.injectSchema(res.page[0].seo.schema)
      }
    })

  }
  ngOnDestroy(): void {
    this.unSub.unsubscribe()


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
