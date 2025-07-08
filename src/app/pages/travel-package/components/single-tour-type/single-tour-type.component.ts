import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { destination } from '../../../../core/interfaces/destination';
import { singleDestination } from '../../../../core/interfaces/single-destination';
import { TourType } from '../../../../core/interfaces/tourtype';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SeoService } from '../../../../core/services/seo.service';
import { TourTypeTransferService } from '../../../../core/services/tour-type-transfer.service';
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { FormsModule } from '@angular/forms';
import { SafeHtmlComponent } from "../../../../shared/components/safe-html/safe-html.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
    imports: [CommonModule, RouterLink, TranslateModule, AskExpertBtnComponent, FormsModule, NgbRatingModule, NgbCollapseModule, SafeHtmlComponent],
    selector: 'app-single-tour-type',
    templateUrl: './single-tour-type.component.html',
    styleUrls: ['./single-tour-type.component.css']
})
export class SingleTourTypeComponent implements OnInit, OnDestroy {
  private unSub!: Subscription;
  rangePric: any;
  range: any;
  rangePriceMax: any;
  minDay: any;
  maxDay: any;
  minRate: any;
  max: number = 5;
  rate = 1;
  desName: any;
  id: any;
  desSlug: any;
  phone: any;
  rangeMDay: any;
  rangeSDay: any;
  count: any;
  isReadonly = true;
  overStar: number | undefined;
  percent: number | undefined;
  modalService: any;
  image = '../../../../../../../assets/imgs/default.png';
  idpackage: any;
  nameCountry = '';
  Filter: singleDestination[] = [];
  category: string = '';
  x: number = 1;
  hot: any[] = [];
  descount: any;
  rangePrice: any;
  price: any;
  categoryPack: TourType[] = []
  noData: boolean = false;
  tourtype: any = '';
  rating: any;
  loading: boolean = true;
  banner: any;
  desOne: destination[] = [];
  nameCat: any;
  isMobile: boolean = false;
  activeService: string = '';
  schema: any;
  slug: any;
  isCollapsed1 = false;
  name: any;
  overview: any;
  nameCategories: any;
  private isBrowser!: boolean;

  constructor(
    private _singleDes: HomeserviceService,
    private seo: SeoService,
    private _active: ActivatedRoute,
    private ngMod: NgbModal,
    public _TourTypeTransferService: TourTypeTransferService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 992;
    }
  }

  ngOnInit(): void {
    this._active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.slug = params.get('slug');

      this.dataToType(this.slug)

      this._singleDes.getOneDestinationDetails(this.id).subscribe((res) => {
        this.banner = res.data[0].destination.banner;
        this.nameCategories = res.data[0].categories[1].name;
      });

      this._TourTypeTransferService.currentHiddenParam.subscribe(hiddenParam => {
        this.activeService = hiddenParam;
        if (hiddenParam) {
          this.allPackages()
        }
      });

      this.allTourType()
    });
  }

  dataToType(slug: any) {
    console.log(slug);

    this._singleDes.getTourTypePackages(this.id, slug).subscribe({
      next: (data) => {
        console.log(data);
        this.getSeo(data)
        console.log(data.packages);
        this.overview = data.overview
        this.nameCountry = data.destination.name
        this.name = data.name
        this.banner = data.banner;
        this.Filter = data.packages;
        this.count = data.packages.length;
        this.loading = false;
      },
    });
  }

  allPackages() {
    this.unSub = this._singleDes
      .getSingleDestinationFilter(this.id, 0, 10000, 1, 30, 1, 5)
      .subscribe((result) => {
        console.log(result);

        this.category = result.data.category.slug;

        this._singleDes.getSeoCategory(this.id, this.category).subscribe({
          next: (seo) => {
            this.desOne = seo.data;
            this.nameCategories = seo.data[0].name;
          },
        });

        this.nameCountry = result.data.destination.name;
        this.desSlug = this.id;
        this.Filter = result.data.packages;
        this.desSlug = result.data.destination.slug;
        this.count = result.data.packages.length;
        this.loading = false;
        if (this.count > 0) {
          this.noData = true;
          this.descount = result.data.packages.discount + '%';
          this.hot = result.data.packages.hot_offer;
        } else {
          this.loading = false;
        }
      });
  }

  allTourType() {
    this._singleDes
      .getTourType(this.id)
      .subscribe({
        next: (result: any) => {
          this.categoryPack = result.data
        },
      });
  }

  getSeo(result: any) {
    this.seo.data.title = result.seo.title;
    console.log(result.seo.title + '00');
    this.seo.data.description = result.seo.description;
    this.seo.data.robots = result.seo.robots;
    this.seo.data.keywords = result.seo.keywords;
    this.seo.data.fbDes = result.seo.facebook_description;
    this.seo.data.fbImg = result.seo.facebook_image;
    this.seo.data.fbTit = result.seo.facebook_title;
    this.seo.data.twitterDes = result.seo.twitter_description;
    this.seo.data.twitterImage = result.seo.twitter_image;
    this.seo.data.twitterTit = result.seo.twitter_title;
    this.seo.updateTags(this.seo.data);
    if (result.seo.schema) {
      this.schema.injectSchema(result.seo.schema)
    }
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  openVerticallyCentered(content: any) {
    this.ngMod.open(content, { centered: true });
  }

  sendData(destinationSlug: any, categorySlug: any) {
    this.loading = true;

    this._singleDes
      .getCategoryPackage(destinationSlug, categorySlug)
      .subscribe({
        next: (result: any) => {
          this.Filter = result.data.package;
          this.count = result.data.package.length;
          this.loading = false;
        },
      });
  }

  rangePri1(val: any) {
    this.loading = true;
    this.rangePric = val.value;
    this._singleDes
      .getSingleDestinationFilter(
        this.id,
        this.rangePric || 0,
        this.rangePrice || 10000,
        1,
        30,
        1,
        5
      )
      .subscribe((result) => {
        this.Filter = result.data.packages;
        this.count = result.data.packages.length;
        this.loading = false;
      });
  }

  rangePri2(val: any) {
    this.loading = true;
    this.rangePrice = val.value;
    this._singleDes
      .getSingleDestinationFilter(
        this.id,
        this.rangePric,
        this.rangePrice,
        1,
        30,
        1,
        5
      )
      .subscribe((result) => {
        this.Filter = result.data.packages;
        this.count = result.data.packages.length;
        this.loading = false;
      });
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }

  ngOnDestroy(): void {
  }

  // Helper method to safely get content for HTML rendering
  getSafeContent(content: any): string {
    if (!content) {
      return '';
    }
    return String(content).trim();
  }
}
