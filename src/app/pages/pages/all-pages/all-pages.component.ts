import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pages } from '../../../core/interfaces/pages';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SeoService } from '../../../core/services/seo.service';
import { Location, NgStyle, SlicePipe } from '@angular/common';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { SecondFooterComponent } from "../../../shared/components/second-footer/second-footer.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { RelatedCardRibbonComponent } from "../../../shared/components/related-card-ribbon/related-card-ribbon.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";

@Component({
    selector: 'app-all-pages',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        ExpertReviewsComponent,
        SecondFooterComponent,
        ScrollButtonComponent,
        RelatedCardRibbonComponent,
        SafeHtmlPipe, NgStyle
    ],
    templateUrl: './all-pages.component.html',
    styleUrls: ['./all-pages.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AllPagesComponent implements OnInit, OnDestroy {

  pagesContent: Pages[] = [];
  id: any;
  genral_data: any
  category_name: any;
  category_slug: any;
  category_description: any;
  destination: any;
  category_banner: any;
  accordion: any
  category_form: any;
  pages: any;
  item = '';
  desSlug: any;
  img = '../../../../assets/imgs/ask.gif'
  loading: boolean = true
  private unSub!: Subscription
  related_pages_list: any;
  country: any;

  constructor(private _location: Location ,private _Page: HomeserviceService, private seo: SeoService
    , private _active: ActivatedRoute , private schema:SchemaInjectionService
  ) {


  }

  ngOnInit(): void {

    this._active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('cat')
      this.country = params.get('slug')
      this.getPageContry(this.country,this.id)

    })

  }
  backClicked() {
    this._location.back();
  }

  getPageContry(country:any,id: any) {
    this.unSub = this._Page.getPageContry(country,id).subscribe(res => {
      //seo
      this.seo.data.title = res.category.seo.title
      // this._title.setTitle(`${res.category.seo.title}`)
      this.seo.data.description = res.category.seo.description
      this.seo.data.robots = res.category.seo.robots
      this.seo.data.keywords = res.category.seo.keywords
      this.seo.data.fbDes = res.category.seo.facebook_description
      this.seo.data.fbImg = res.category.seo.facebook_image
      this.seo.data.fbTit = res.category.seo.facebook_title
      this.seo.data.twitterDes = res.category.seo.twitter_description
      this.seo.data.twitterImage = res.category.seo.twitter_image
      this.seo.data.twitterTit = res.category.seo.twitter_title
      this.seo.updateTags(this.seo.data)
      if (res.category.seo.schema) {
        this.schema.injectSchema(res.category.seo.schema)
      }
      // end seo
      this.genral_data = res.category
      this.loading = false
      this.destination = res.category.destination.name
      this.desSlug = res.category.destination.slug
      this.pages = res.category.pages
      this.related_pages_list = res.category.related_pages_list
      this.category_form = res.category.form
      this.category_slug = res.category.slug
      this.accordion=res.category.accordion
    })

  }

  showSlug(slug: any) {
    this.item = slug;
    this.getPageContry(this.country,slug)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }

  ngOnDestroy(): void {
   this.unSub.unsubscribe()
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
