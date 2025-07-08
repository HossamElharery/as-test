import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { destination } from '../../../core/interfaces/destination';
import { TravelGuide } from '../../../core/interfaces/travel-guide';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { SafeHtmlComponent } from "../../../shared/components/safe-html/safe-html.component";
import { AskExpertBtnComponent } from "../../../shared/components/ask-expert-btn/ask-expert-btn.component";

@Component({
    selector: 'app-travel-guide',
    imports: [
        CommonModule,
        RouterLink,
        TranslateModule,
        ScrollButtonComponent,
        SafeHtmlComponent,
        AskExpertBtnComponent
    ],
    templateUrl: './travel-guide.component.html',
    styleUrls: ['./travel-guide.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class TravelGuideComponent implements OnInit ,OnDestroy{

  guidesContainer: TravelGuide[] = [];
  blogDes: string = '';
  desName: string = '';
  desSlug: string = '';
  category: string = '';
  id: any;
  allGuides: destination[] = [];
  navigate: any;
  name: any;
  nodata: boolean = false
  loading:boolean=true

  subscription:Subscription = new Subscription()
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private _blogs: HomeserviceService, private _active: ActivatedRoute, private seo: SeoService
  ,private schema : SchemaInjectionService
  ) {}

  ngOnInit(): void {
    this.subscription.add( this._active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('slug')

      this._blogs.getDestinationGuides(this.id).subscribe(result => {

        this.category = result.data.category.slug
        this._blogs.getSeoCategory(this.id, this.category).subscribe({
          next: res => {
            this.getSeo(res)
            this.allGuides = res.data
            this.loading=false
          }
        })
        this.name =result.data.category.name

        this.guidesContainer = result.data.travelGuides
        this.desName = result.data.destination[0].name,
        this.desSlug = result.data.destination[0].slug,
        this.loading=false
      })

    }))

  }
  getSeo(result: any) {
    //seo
    this.seo.data.title = result.data[0].seo.title
    this.seo.data.description = result.data[0].seo.description
    this.seo.data.robots = result.data[0].seo.robots
    this.seo.data.keywords = result.data[0].seo.keywords
    this.seo.data.fbDes = result.data[0].seo.facebook_description
    this.seo.data.fbImg = result.data[0].seo.facebook_image
    this.seo.data.fbTit = result.data[0].seo.facebook_title
    this.seo.data.twitterDes = result.data[0].seo.twitter_description
    this.seo.data.twitterImage = result.data[0].seo.twitter_image
    this.seo.data.twitterTit = result.data[0].seo.twitter_title
    this.seo.updateTags(this.seo.data)
    if (result.data[0].seo.schema) {
      this.schema.injectSchema(result.data[0].seo.schema)
    }
    // end seo
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
