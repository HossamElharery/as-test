import { LayoutService } from './../services/layout.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessagesService } from '../../core/services/messages/messages.service';
import { TourTypeTransferService } from '../../core/services/tour-type-transfer.service';
import { HomeserviceService } from '../../core/services/homeservice.service';
import { CommonModule, DOCUMENT, NgClass, NgOptimizedImage, NgStyle, SlicePipe, TitleCasePipe } from '@angular/common';
import { destination } from '../../core/interfaces/destination';
import { Faq } from '../../core/interfaces/faq';
import { TravelGuide } from '../../core/interfaces/travel-guide';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import config from '../../../assets/locales.json';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterModule,
        TranslateModule,
        CommonModule,
        CapitalizePipe,
        NgbCollapseModule,
        NgOptimizedImage
    ],
    providers: [LayoutService],
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.scss',
        './navbar.component.responsive.scss'
    ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  navbarCollapsed: boolean = true;
  @ViewChild('closee') closee!: ElementRef
  destinationContainer: destination[] = [];
  slugDestinatios: string = "egypt";
  singleDestinationContent: destination[] = []
  slide: any;
  Excursionslug: any;
  guideContainer: destination[] = [];
  citys: Faq[] = [];
  thumb: any;
  guideDes: any;
  guidesContainer: TravelGuide[] = [];
  flagGuide: boolean = false
  destinationDropdownVisible: boolean = false;
  excursionDropdownVisible: boolean = false;
  guideDropdownVisible: boolean = false;
  contacts: boolean = false;
  hotoffersDropdownVisible: boolean = false;
  tourTypeDropdownVisible: boolean = false;

  lastSlug: string | null = null;
  destinationsArray: any[] = [];
  hot_offer_packages: any[] = [];
  city_excursions: any[] = [];
  travel_guides: any[] = [];
  categories: any[] = [];

  private subscription: Subscription = new Subscription()
  excursionsIndex: any;
  slugCheck: boolean = false;
  hotOfferSlug: any;
  hotOffers: any[] = [];
  tour_type: any[] = [];
  tourTypes: any[] = [];

  isLoading: boolean = false;
  lang!: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public _Navbar: LayoutService,
    public _router: Router,
    public _TourTypeTransferService: TourTypeTransferService,
    private translate:TranslateService
  ) {
    this.lang = this.translate.currentLang
  }

  ngOnInit(): void {
    this.getData()
    this.getMegaMenu()
  }

  ngOnDestroy(): void {

  }

  getMegaMenu() {
    this.subscription.add(this._Navbar.getMegaMenu()
      .subscribe({
        next: res => {
          // tour_type
          this.destinationsArray = res.data.destinations;
          this.hot_offer_packages = res.data.hot_offer_packages;
          this.hotOfferDesHover(this.hot_offer_packages[0][0].destination?.slug, 0)
          this.city_excursions = res.data.city_excursions;

          this.ExcursionDesHover(this.city_excursions[0][0].destination?.slug, 0)
          this.travel_guides = res.data.travel_guides;
          this.guideDesHover(this.travel_guides[0][0].destination?.slug, 0)

          this.categories = res.data.categories
          this.destinatios(this.categories[0][0].destination?.slug, 0)
          this.tour_type = res.data.tour_type
          this.tourTypeDesHover(this.tour_type[0][0].destination?.slug, 0)
        }
      })
    )
  }
  // megaDestinatios
  chooseSlug(slug:any){
    if (slug == 'myths-facts' || slug == 'blogs' || slug == 'travel-cruises' || slug == 'travel-excursions' || slug == 'travel-packages' || slug == 'travel-guides' || slug == 'hotels' ) {
      this.slugCheck = true
    }else {
      this.slugCheck = false
    }
  }

  destinatios(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.slugDestinatios = slug

      // this._Navbar.getOneDestinationDetails(slug).subscribe(result => {
      //   this.singleDestinationContent = result.data[0].categories;
      //   this.slide = result.data[0]?.destination?.banner;

      // },
      //   error => {
      //   })
      //@ts-ignore
      // if (this.singleDestinationContent[i]) {
      //   this.singleDestinationContent[i].slug = slug;
      // }
      let arr  = this.categories.filter(res => {
        return res
    })
    let arr2 = arr.filter((des : any) => {
     return des[0]?.destination?.slug == slug
     })
     this.singleDestinationContent = arr2[0]

    }

  }
  routedDestinatios(s: any) {
    this._router.navigate([`/all-destinations/${this.slugDestinatios}/${s}`]);

  }

  hideDropdown(dropdown: string): void {
    if (dropdown === 'destination') {
      this.destinationDropdownVisible = false;
    } else if (dropdown === 'excursion') {
      this.excursionDropdownVisible = false;
    }
    else if (dropdown === 'guide') {
      this.guideDropdownVisible = false;
    }
    else if (dropdown === 'hotoffers') {
      this.hotoffersDropdownVisible = false
    }
    else if (dropdown === 'tourtype') {
      this.tourTypeDropdownVisible = false
    }
    else if (dropdown === 'contacts') {
      this.contacts = false;
    }
  }


  // Travel Guides
  guideDesHover(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.guideDes = slug
      let arr  = this.travel_guides.filter(res => {
        return res
    })
    let arr2 = arr.filter((excur : any) => {
     return excur[0]?.destination?.slug == slug
     })
     this.guidesContainer = arr2[0]
    }

  }


  routeGuide(s: any) {
    this._router.navigateByUrl(`/all-destinations/${this.guideDes}/travel-guide/${s}`)
    // ([`/${this.guideDes}/travel-guide/${s}`])
    // location.reload();
  }
  // megaExcursion
  getData() {
    this._Navbar.getAlldestination().subscribe((result:any) => {
      this.destinationContainer = result.data
      this.guideContainer = result.data

    });
  }

  ExcursionDesHover(slug: any, i: any) {

    if (slug !== this.lastSlug) {
      this.Excursionslug = slug
      this.excursionsIndex = i
      let arr  = this.city_excursions.filter(res => {
        return res
    })
    let arr2 = arr.filter((excur : any) => {
     return excur[0]?.destination?.slug == slug
     })
     this.citys = arr2[0]
      // this._Navbar.ExcursionCity(slug).subscribe(result => {
      //   this.thumb = result.data.cities[0]?.thumb
      //   this.citys = result.data.cities;


      // })

      //@ts-ignore
      // if (this.destinationContainer[i]) {
      //   this.destinationContainer[i].slug = slug
      // }

    }


  }

  tourTypeDesHover(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.tourTypes = slug

      let arr  = this.tour_type.filter(res => {
        return res
    })
    let arr2 = arr.filter((excur : any) => {
     return excur[0]?.destination?.slug == slug
     })
     this.tourTypes = arr2[0]
    }

  }
  hotOfferDesHover(slug: any, i: any) {

    if (slug !== this.lastSlug) {
      this.hotOfferSlug = slug
      this.excursionsIndex = i
      let arr  = this.hot_offer_packages.filter(res => {
        return res
    })
    let arr2 = arr.filter((hot : any) => {
     return hot[0]?.destination?.slug == slug
     })
     this.hotOffers = arr2[0]

    }


  }

  routedExcursion(s: any) {
    this._router.navigate([`/all-destinations/${this.Excursionslug}/travel-excursions/${s}`])
    // console.log('Navigating to:', `/all-destinations/${this.Excursionslug}/travel-excursions/${s}`);


  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    const list = document.getElementById("nav-bar")?.classList;

    if (offset >= 10) {
      list?.add("position-fixed");
      list?.add("sticky-top");
    }
    else {
      list?.remove("sticky-top");
    }
  }

  ddToggle(): void {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.closee.nativeElement.click()

    }

  }
}
