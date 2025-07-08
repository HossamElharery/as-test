import { Component, OnInit } from '@angular/core';
import { Pages } from '../../interfaces/pages';
import { HomeserviceService } from '../../services/homeservice.service';
import { SeoService } from '../../services/seo.service';
import { SchemaInjectionService } from '../../services/schema-injection.service';

import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";

import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { RelatedCardRibbonComponent } from '../../../shared/components/related-card-ribbon/related-card-ribbon.component';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { ExpertReviewsComponent } from '../../../shared/components/side-bar/expert-reviews/expert-reviews.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { NgStyle, CommonModule } from '@angular/common';

@Component({
    selector: 'app-privacy-policy',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        ExpertReviewsComponent,
        SafeHtmlPipe,
        innerHtmlPipe,
        RelatedCardRibbonComponent,
        ScrollButtonComponent, CommonModule
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

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

  constructor(private _page : HomeserviceService , private seo:SeoService , private schema:SchemaInjectionService) { }

  ngOnInit(): void {
    this._page.getSinglePageGeneral(`privacy-policy`).subscribe(res => {

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
    })

}

numSequence(n: number): Array<number> {
  return Array(n);
}
}
