import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';

@Component({
    selector: 'app-all-hotels',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        NgbRatingModule,
        NgbCollapseModule,
        FormsModule,
        NgxPaginationModule,
        NgStyle,
        SafeHtmlComponent
    ],
    templateUrl: './all-hotels.component.html',
    styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {

  loading: boolean = true;
  Filter: any;
  x: number = 1;
  isReadonly = true;
  banner: any;
  nameCategories: any;
  description: any;
  count!: number;
  city: any;
  des!: string;
  cityData: any;
  page: number = 1;
  totalItems: any;
  itemsPerPage: number=15;
  currentPage:number=1;
  public isBrowser: boolean;

  constructor(
    private _singleDes: HomeserviceService,
    private ngMod: NgbModal,
    private _active: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    private schema:SchemaInjectionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {


    this._active.paramMap.subscribe((params: ParamMap) => {
      this.des= this.router.url.split('/')[2]
      this.city = params.get('city');

      this._singleDes.getHotelsList(this.des,this.city,this.currentPage).subscribe({
        next: (result) => {

          this.seo.data.title = result.data.seo[0].title
          this.seo.data.description = result.data.seo[0].description
          this.seo.data.robots = result.data.seo[0].robots
          this.seo.data.keywords = result.data.seo[0].keywords
          this.seo.data.fbDes = result.data.seo[0].facebook_description
          this.seo.data.fbImg = result.data.seo[0].facebook_image
          this.seo.data.fbTit = result.data.seo[0].facebook_title
          this.seo.data.twitterDes = result.data.seo[0].twitter_description
          this.seo.data.twitterImage = result.data.seo[0].twitter_image
          this.seo.data.twitterTit = result.data.seo[0].twitter_title
          this.seo.updateTags(this.seo.data)
          if (result.data.seo[0].schema) {
            this.schema.injectSchema(result.data.seo[0].schema)
          }
          this.totalItems = result.data.paginator.total;

          this.cityData=result.data.city
          this.Filter= result.data.hotels_data
           this.count=result.data.hotels_data.length
          this.loading=false

        },

       });

    });

  }


  gty(page: any) {
    this.loading = true

    this.currentPage = page;
    if (this.isBrowser) {
      window.scroll({
        top: 460,
        left: 0,
        behavior: 'smooth'
      });
    }

    this._singleDes.getHotelsList(this.des, this.city, this.currentPage).subscribe({
      next: (result) => {

        this.seo.data.title = result.data.seo[0].title
        this.seo.data.description = result.data.seo[0].description
        this.seo.data.robots = result.data.seo[0].robots
        this.seo.data.keywords = result.data.seo[0].keywords
        this.seo.data.fbDes = result.data.seo[0].facebook_description
        this.seo.data.fbImg = result.data.seo[0].facebook_image
        this.seo.data.fbTit = result.data.seo[0].facebook_title
        this.seo.data.twitterDes = result.data.seo[0].twitter_description
        this.seo.data.twitterImage = result.data.seo[0].twitter_image
        this.seo.data.twitterTit = result.data.seo[0].twitter_title
        this.seo.updateTags(this.seo.data)
        this.cityData = result.data.city
        this.Filter = result.data.hotels_data
        this.count = result.data.hotels_data.length
        this.loading = false

      },

    });

    // this._blogs.getDestinationBlogs(this.id,this.currentPage).subscribe((data: any) => {
    //     this.blogContainer = data.data.blogs
    //     this.loading=false
    //   });


  }

  openVerticallyCentered(content: any) {
    this.ngMod.open(content, { centered: true });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  getSeo(result: any) {
    //seo
    this.seo.data.title = result.data[0].seo.title;
    this.seo.data.description = result.data[0].seo.description;
    this.seo.data.robots = result.data[0].seo.robots;
    this.seo.data.keywords = result.data[0].seo.keywords;
    this.seo.data.fbDes = result.data[0].seo.facebook_description;
    this.seo.data.fbImg = result.data[0].seo.facebook_image;
    this.seo.data.fbTit = result.data[0].seo.facebook_title;
    this.seo.data.twitterDes = result.data[0].seo.twitter_description;
    this.seo.data.twitterImage = result.data[0].seo.twitter_image;
    this.seo.data.twitterTit = result.data[0].seo.twitter_title;
    this.seo.updateTags(this.seo.data);
    // end seo
  }

  getSafeContent(content: any): string {
    if (!content) return '';
    return typeof content === 'string' ? content : String(content);
  }
}
