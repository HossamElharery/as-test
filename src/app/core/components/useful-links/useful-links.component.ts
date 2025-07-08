import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Pages } from '../../interfaces/pages';
import { HomeserviceService } from '../../services/homeservice.service';
import { SeoService } from '../../services/seo.service';
import { SchemaInjectionService } from '../../services/schema-injection.service';

import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { RelatedCardRibbonComponent } from '../../../shared/components/related-card-ribbon/related-card-ribbon.component';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { ExpertReviewsComponent } from '../../../shared/components/side-bar/expert-reviews/expert-reviews.component';
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-useful-links',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        ExpertReviewsComponent,
        SafeHtmlComponent,
        RelatedCardRibbonComponent,
        ScrollButtonComponent, NgStyle, SlicePipe
    ],
    templateUrl: './useful-links.component.html',
    styleUrls: ['./useful-links.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class UsefulLinksComponent implements OnInit {
  singlePageContent:Pages[]=[];
  slug: any;

  loading: boolean = true
  script: any;

  relatedPages: Pages[] = [];

  related_blogs: Pages[] = [];
  related_packages: Pages[] = [];
  related_excursions: Pages[] = [];
  related_cruises: Pages[] = [];
  related_travel_guides: Pages[] = [];

  related_categories: Pages[] = [];
  accordion: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(public useful:HomeserviceService,private schema:SchemaInjectionService ,private seo:SeoService,  private _active : ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this._active.paramMap.subscribe((params:ParamMap)=>{

      this.slug=params.get('slug')
      this.loading=true
      this.useful.getSinglePageGeneral(this.slug).subscribe({
        next: (res) => {

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

          this.singlePageContent = res.page

          this.script = res.page[0].form;
          this.loading=false
          this.relatedPages = res.page[0].related_pages;
          this.related_blogs = res.page[0].related_blogs;
          this.related_packages = res.page[0].related_packages;
          this.related_cruises = res.page[0].related_cruises;
          this.related_excursions = res.page[0].related_excursions;
          this.related_travel_guides = res.page[0].related_travel_guides;
          this.related_categories = res.page[0].related_categories;

          this.accordion=res.page[0].accordion

        },
        error: (e) => {
          this.router.navigate(['/404']);
        },
       });
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
