import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { destination } from '../../../../core/interfaces/destination';
import { singleDestination } from '../../../../core/interfaces/single-destination';
import { TourType } from '../../../../core/interfaces/tourtype';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { TourTypeTransferService } from '../../../../core/services/tour-type-transfer.service';
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { SafeHtmlComponent } from "../../../../shared/components/safe-html/safe-html.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
    imports: [
        CommonModule,
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        NgbRatingModule,
        NgbCollapseModule,
        FormsModule,
        SafeHtmlComponent
    ],
    selector: 'app-package-details',
    templateUrl: './package-details.component.html',
    styleUrls: ['./package-details.component.css'],
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
    ]
})
export class PackageDetailsComponent implements OnInit, OnDestroy , AfterViewInit {
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
  image = '../../../../../assets/imgs/default.png';
  idpackage: any;
  nameCountry = '';
  Filter: singleDestination[] = [];
  category: string = '';
  x: number = 1;
  hot: any[] = [];
  descount: any;
  rangePrice: any;
  price: any;
  // tourType:any[]=['Family Friendly','Adventure or Sporting','Sightseeing','Combining','Spiritual'
  // ,'Multi Country','Medical','Meditation','Romantic &Honeymoon','Indulgence & Luxury','Culinary, Food & Wine','Shore Excursion','Extended',]
  // filter BY
  isCollapsed = false;
  isCollapsed1 = false;

  isCollapsed2 = false;
  isCollapsed3 = false;
  // categoryPack = [
  //   { name: 'Land only Tours', pack_slug: 'land-only-tours' },
  //   { name: '3-7 Nights Packages', pack_slug: '3-7-nights-packages' },
  //   { name: '8-14 Nights Packages', pack_slug: '8-14-nights-packages' },
  //   { name: '15-20 Nights Packages', pack_slug: '15-20-nights-packages' },
  //   { name: 'Egypt & Jordan', pack_slug: 'egypt-jordan' },
  //   { name: 'Package With Flights', pack_slug: 'package-with-flights' },
  //   { name: 'Nile Cruise Packages', pack_slug: 'nile-cruise-packages' },
  //   { name: 'Dahabiya Packages', pack_slug: 'dahabiya-packages' },
  //   {
  //     name: 'Meditation Trips (Groups Only)',
  //     pack_slug: 'meditation-trips-groups-only',
  //   },
  // ];
  categoryPack:TourType[]=[]
  noData: boolean = false;
  tourtype: any = '';
  rating: any;
  loading: boolean = true;
  nameCategories: any;
  banner: any;
  desOne: destination[] = [];
  nameCat: any;
  // @ViewChild('click') click!:ElementRef

  activeService: string = '';
  isMobile: boolean=false;

  constructor(
    private _singleDes: HomeserviceService,
    public sanitizer: DomSanitizer,

    private _active: ActivatedRoute,
    private ngMod: NgbModal,
    private seo: SeoService,
    private schema:SchemaInjectionService,
    public _TourTypeTransferService:TourTypeTransferService,
    @Inject(PLATFORM_ID) private platformId: any

  ) {
    this.checkScreenSize();
  }
  private isBrowser!: boolean;

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 992; // 768px is a common breakpoint for mobile devices
    }
  }

  // Helper method to safely get content for HTML rendering
  getSafeContent(content: any): string {
    if (!content) {
      return '';
    }
    return String(content).trim();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.unSub =   this._singleDes.getcat().subscribe(res => {
    //   this.nameCat = res

    //   this.click.nativeElement.click()
    //  })
  }
  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);





    this._active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');



      this._singleDes.getOneDestinationDetails(this.id).subscribe((res) => {
        // this.category = res.data[0].categories[1].slug
        this.banner = res.data[0].destination.banner;
        // this.nameCategories = res.data[0].categories[1].name;
      });


      this._TourTypeTransferService.currentHiddenParam.subscribe(hiddenParam => {
        this.activeService = hiddenParam;
        // Do something with the hidden parameter
        if (hiddenParam) {
          this.allPackages()

           this.dataToType(hiddenParam)

        }
        else {
           this.allPackages()
        }


      });



      this.allTourType()
    });
  }
  dataToType(slug:any){

    // console.log(slug);

    this._singleDes.getTourTypePackages(this.id, slug).subscribe({
      next: (data) => {
// console.log(data.packages);
this.Filter = data.packages;
this.count = data.packages.length;
this.loading = false;
      },
    });


  }

  allTourType() {

    // this.loading = true;

    this._singleDes
      .getTourType(this.id)
      .subscribe({
        next: (result: any) => {

           this.categoryPack=result.data
          // console.log(result);

        },
      });
  }

  allPackages(){
    this.unSub = this._singleDes
    .getSingleDestinationFilter(this.id, 0, 10000, 1, 30, 1, 5)
    .subscribe((result) => {
      // console.log(result);

      this.category = result.data.category.slug;

      this._singleDes.getSeoCategory(this.id, this.category).subscribe({
        next: (seo) => {
          this.getSeo(seo);
          this.desOne = seo.data;
          // console.log(seo.data);

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
    if (result.data[0].seo.schema) {
      this.schema.injectSchema(result.data[0].seo.schema)
    }
    // end seo
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
  //  RANGE DAYS
  rangeStartDay(minD: any) {
    this.loading = true;
    this.rangeSDay = minD.value;

    this._singleDes
      .getSingleDestinationFilter(
        this.id,
        this.rangePric || 0,
        this.rangePrice || 10000,
        this.rangeSDay,
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
  rangeEndDay(val: any) {
    this.loading = true;
    this.rangeMDay = val.value;
    this._singleDes
      .getSingleDestinationFilter(
        this.id,
        this.rangePric || 0,
        this.rangePrice || 10000,
        this.rangeSDay || 1,
        this.rangeMDay,
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
    this.unSub.unsubscribe();
  }

  // packageTrackBy(index:number,) {
  //   return cor.hex;
  //  }
}
