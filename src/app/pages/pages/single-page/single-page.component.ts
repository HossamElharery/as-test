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
    // First check if we have resolver data (from SSR)
    const resolverData = this._Active.snapshot.data['pageData'];
    if (resolverData?.page?.[0]) {
      // Use resolver data immediately (already loaded during SSR)
      this.handlePageData(resolverData);
    }

    // Still subscribe for client-side navigation
    this.subscription.add(this._Active.paramMap.subscribe((params: ParamMap) => {
      this.loading = true

      this.id = params.get('page');
      this.caat = params.get('cat');
      this.des = params.get('slug');

      // Skip API call if we already have resolver data for this route
      if (!resolverData || resolverData.page[0]?.page_slug !== this.id) {
        this.subscription.add(this._page.getSinglePage(this.des,this.caat ,this.id).subscribe({
          next: (result) => {
            this.handlePageData(result);
          },
          error: (error) => {
            console.error('Error fetching page data:', error);
            this.loading = false;
            this.router.navigate(['/404']);
          }
        }));
      }
    }));
  }

  private handlePageData(result: any): void {
    try {
      // SAFE: Add comprehensive null checks
      const pageData = result?.page?.[0];
      const seoData = pageData?.seo;

      if (pageData && seoData) {
        // Use the comprehensive SEO update method
        this.seo.updateCompleteMetaTags(seoData);

        if (seoData.schema) {
          this.schemaInjectionService.injectSchema(seoData.schema);
        }

        // SAFE: Set page content with null checks
        this.singlePageContent = result.page || [];
        this.gallery = pageData.gallery || [];
        this.destination = pageData.destination || {};
        this.category = pageData.category || {};
        this.relatedPages = pageData.related_pages || [];
        this.related_blogs = pageData.related_blogs || [];
        this.related_packages = pageData.related_packages || [];
        this.related_cruises = pageData.related_cruises || [];
        this.related_excursions = pageData.related_excursions || [];
        this.related_travel_guides = pageData.related_travel_guides || [];
        this.related_categories = pageData.related_categories || [];

        // Handle special iframe case
        if(this.id=='the-treasures-of-egypt-tour-booking-centre'){
          this.iframe=true;
        }
      } else {
        console.warn('Single page data is incomplete or missing');
        // Set fallback data
        this.singlePageContent = [];
        this.gallery = [];
        this.destination = {};
        this.category = {};
        this.relatedPages = [];
        this.related_blogs = [];
        this.related_packages = [];
        this.related_cruises = [];
        this.related_excursions = [];
        this.related_travel_guides = [];
        this.related_categories = [];
      }

      this.loading = false;
    } catch (error) {
      console.error('Error processing single page data:', error);
      this.loading = false;
      // Set fallback data
      this.singlePageContent = [];
      this.gallery = [];
      this.destination = {};
      this.category = {};
      this.relatedPages = [];
      this.related_blogs = [];
      this.related_packages = [];
      this.related_cruises = [];
      this.related_excursions = [];
      this.related_travel_guides = [];
      this.related_categories = [];
    }
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
