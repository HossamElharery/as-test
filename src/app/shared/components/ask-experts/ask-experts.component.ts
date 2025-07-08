import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Pages } from '../../../core/interfaces/pages';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SeoService } from '../../../core/services/seo.service';

import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from "../ask-expert-btn/ask-expert-btn.component";
import { ExpertReviewsComponent } from "../side-bar/expert-reviews/expert-reviews.component";
import { SafeHtmlComponent } from "../safe-html/safe-html.component";
import { RelatedCardRibbonComponent } from "../related-card-ribbon/related-card-ribbon.component";
import { ScrollButtonComponent } from "../scroll-button/scroll-button.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SafeHtmlPipe } from "../../pipes/safe-html/safe-html.pipe";


@Component({
    imports: [RouterLink, TranslateModule, AskExpertBtnComponent, ExpertReviewsComponent, SafeHtmlComponent, RelatedCardRibbonComponent, ScrollButtonComponent, CommonModule,],
    selector: 'app-ask-experts',
    templateUrl: './ask-experts.component.html',
    styleUrls: ['./ask-experts.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})
export class AskExpertsComponent implements OnInit {
  singlePageContent:Pages[]=[];

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

  constructor(private _page:HomeserviceService , private seo:SeoService) { }

  ngOnInit(): void {
    this._page.getSinglePageGeneral(552).subscribe(res => {

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

    })

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
