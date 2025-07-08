import { isPlatformBrowser, NgStyle, SlicePipe } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Pages } from '../../../core/interfaces/pages';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { RelatedCardRibbonComponent } from "../../../shared/components/related-card-ribbon/related-card-ribbon.component";
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { GalleryNewComponent } from "../../../shared/components/gallery-new/gallery-new.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";

@Component({
    selector: 'app-single-page',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        RelatedCardRibbonComponent,
        ExpertReviewsComponent,
        ScrollButtonComponent,
        GalleryNewComponent,
        SafeHtmlPipe,
        NgStyle, SlicePipe
    ],
    templateUrl: './single-page.component.html',
    styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit,OnDestroy {
  type = true;
  singlePageContent: Pages[] = [];
  relatedPages: Pages[] = [];

  related_blogs: Pages[] = [];
  related_packages: Pages[] = [];
  related_excursions: Pages[] = [];
  related_cruises: Pages[] = [];
  related_travel_guides: Pages[] = [];

  related_categories: Pages[] = [];

  id: any;
  img = [];
  destination: any;
  category: any;
  title: any;
  caat: any;

  isBrowser;
  gallery: any;
  des:any;
  loading: boolean = true
  iframe:boolean=false
  subscription:Subscription = new Subscription()

  constructor(
    private _page: HomeserviceService,
    private _Active: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    private schemaInjectionService: SchemaInjectionService,

    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.subscription.add(this._Active.paramMap.subscribe((params: ParamMap) => {
      this.loading = true

      this.id = params.get('page');

      this.caat = params.get('cat');
      this.des = params.get('slug');
      this.subscription.add(this._page.getSinglePage(this.des,this.caat ,this.id).subscribe({
        next: (result) => {
          //seo
          this.seo.data.title = result.page[0].seo.title;
          this.seo.data.description = result.page[0].seo.description;
          this.seo.data.robots = result.page[0].seo.robots;
          this.seo.data.keywords = result.page[0].seo.keywords;
          this.seo.data.fbDes = result.page[0].seo.facebook_description;
          this.seo.data.fbImg = result.page[0].seo.facebook_image;
          this.seo.data.fbTit = result.page[0].seo.facebook_title;
          this.seo.data.twitterDes = result.page[0].seo.twitter_description;
          this.seo.data.twitterImage = result.page[0].seo.twitter_image;
          this.seo.data.twitterTit = result.page[0].seo.twitter_title;
          // if (result.page[0].seo.schema) {
          //   this.schemaInjectionService.injectSchema(result.page[0].seo.schema)
          // }

          this.seo.updateTags(this.seo.data);
          if (result.page[0].seo.schema) {
            this.schemaInjectionService.injectSchema(result.page[0].seo.schema)
          }





          // const schema  =result.page[0].form


          // this.schemaInjectionService.injectSchema(schema);


          this.singlePageContent = result.page;
          this.loading = false
          this.gallery = result.page[0].gallery;
          this.destination = result.page[0].destination;
          this.category = result.page[0].category;
          this.relatedPages = result.page[0].related_pages;
          this.related_blogs = result.page[0].related_blogs;
          this.related_packages = result.page[0].related_packages;
          this.related_cruises = result.page[0].related_cruises;
          this.related_excursions = result.page[0].related_excursions;
          this.related_travel_guides = result.page[0].related_travel_guides;
          this.related_categories = result.page[0].related_categories;

          if(this.id=='the-treasures-of-egypt-tour-booking-centre'){
            this.iframe=true
          }
        },
                error: (e) => {
           this.router.navigate(['/404']);
        },
      }));
    }));
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 5000,
    pullDrag: true,
    margin: 8,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.schemaInjectionService.injectSchema(null);

  }
}
