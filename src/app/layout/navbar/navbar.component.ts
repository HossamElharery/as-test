import { LayoutService } from './../services/layout.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild, Renderer2, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonModule, DOCUMENT, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { destination } from '../../core/interfaces/destination';
import { Faq } from '../../core/interfaces/faq';
import { TravelGuide } from '../../core/interfaces/travel-guide';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

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
  lang: string;

  // SAFE: Add platform detection for SSR compatibility
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public _Navbar: LayoutService,
    public _router: Router,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.getData()
    this.getMegaMenu()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  getMegaMenu() {
    this.subscription.add(this._Navbar.getMegaMenu()
      .subscribe({
        next: res => {
          try {
            // SAFE array access with proper null checks
            console.log('MegaMenu response:', res);

            // SAFE: Initialize arrays with proper fallbacks
            const data = res?.data || {};
            this.destinationsArray = Array.isArray(data.destinations) ? data.destinations : [];
            this.hot_offer_packages = Array.isArray(data.hot_offer_packages) ? data.hot_offer_packages : [];
            this.city_excursions = Array.isArray(data.city_excursions) ? data.city_excursions : [];
            this.travel_guides = Array.isArray(data.travel_guides) ? data.travel_guides : [];
            this.categories = Array.isArray(data.categories) ? data.categories : [];
            this.tour_type = Array.isArray(data.tour_type) ? data.tour_type : [];

            // SAFE: Check if arrays exist and have valid nested structure before accessing
            if (this.hot_offer_packages.length > 0 &&
                Array.isArray(this.hot_offer_packages[0]) &&
                this.hot_offer_packages[0].length > 0 &&
                this.hot_offer_packages[0][0]?.destination?.slug) {
              this.hotOfferDesHover(this.hot_offer_packages[0][0].destination.slug, 0);
            }

            if (this.city_excursions.length > 0 &&
                Array.isArray(this.city_excursions[0]) &&
                this.city_excursions[0].length > 0 &&
                this.city_excursions[0][0]?.destination?.slug) {
              this.ExcursionDesHover(this.city_excursions[0][0].destination.slug, 0);
            }

            if (this.travel_guides.length > 0 &&
                Array.isArray(this.travel_guides[0]) &&
                this.travel_guides[0].length > 0 &&
                this.travel_guides[0][0]?.destination?.slug) {
              this.guideDesHover(this.travel_guides[0][0].destination.slug, 0);
            }

            if (this.categories.length > 0 &&
                Array.isArray(this.categories[0]) &&
                this.categories[0].length > 0 &&
                this.categories[0][0]?.destination?.slug) {
              this.destinatios(this.categories[0][0].destination.slug, 0);
            }

            if (this.tour_type.length > 0 &&
                Array.isArray(this.tour_type[0]) &&
                this.tour_type[0].length > 0 &&
                this.tour_type[0][0]?.destination?.slug) {
              this.tourTypeDesHover(this.tour_type[0][0].destination.slug, 0);
            }

          } catch (error) {
            console.error('Error processing MegaMenu data:', error);
            // Set fallback empty arrays
            this.destinationsArray = [];
            this.hot_offer_packages = [];
            this.city_excursions = [];
            this.travel_guides = [];
            this.categories = [];
            this.tour_type = [];
          }
        },
        error: (error) => {
          console.error('Error loading MegaMenu:', error);
          // Set fallback empty arrays
          this.destinationsArray = [];
          this.hot_offer_packages = [];
          this.city_excursions = [];
          this.travel_guides = [];
          this.categories = [];
          this.tour_type = [];
        }
      })
    )
  }
  private safeArrayAccess(array: any[], index1: number, index2: number): boolean {
    return array &&
           array.length > index1 &&
           array[index1] &&
           array[index1].length > index2 &&
           array[index1][index2];
  }

  // megaDestinatios
 chooseSlug(slug: any) {
    if (slug == 'myths-facts' || slug == 'blogs' || slug == 'travel-cruises' || slug == 'travel-excursions' || slug == 'travel-packages' || slug == 'travel-guides' || slug == 'hotels') {
      this.slugCheck = true
    } else {
      this.slugCheck = false
    }
  }

  destinatios(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.slugDestinatios = slug

      // SAFE: Filter categories with proper array checks
      try {
        let arr = Array.isArray(this.categories) ? this.categories.filter(res => res) : [];
        let arr2 = arr.filter((des: any) => {
          return Array.isArray(des) && des[0]?.destination?.slug == slug
        })
        this.singleDestinationContent = Array.isArray(arr2[0]) ? arr2[0] : []
      } catch (error) {
        console.error('Error in destinatios:', error);
        this.singleDestinationContent = [];
      }
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

      // SAFE: Filter travel_guides with proper array checks
      try {
        let arr = Array.isArray(this.travel_guides) ? this.travel_guides.filter(res => res) : [];
        let arr2 = arr.filter((excur: any) => {
          return Array.isArray(excur) && excur[0]?.destination?.slug == slug
        })
        this.guidesContainer = Array.isArray(arr2[0]) ? arr2[0] : []
      } catch (error) {
        console.error('Error in guideDesHover:', error);
        this.guidesContainer = [];
      }
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

      // SAFE: Filter city_excursions with proper array checks
      try {
        let arr = Array.isArray(this.city_excursions) ? this.city_excursions.filter(res => res) : [];
        let arr2 = arr.filter((excur: any) => {
          return Array.isArray(excur) && excur[0]?.destination?.slug == slug
        })
        this.citys = Array.isArray(arr2[0]) ? arr2[0] : []
      } catch (error) {
        console.error('Error in ExcursionDesHover:', error);
        this.citys = [];
      }
    }
  }

  tourTypeDesHover(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.tourTypes = slug

      // SAFE: Filter tour_type with proper array checks
      try {
        let arr = Array.isArray(this.tour_type) ? this.tour_type.filter(res => res) : [];
        let arr2 = arr.filter((excur: any) => {
          return Array.isArray(excur) && excur[0]?.destination?.slug == slug
        })
        this.tourTypes = Array.isArray(arr2[0]) ? arr2[0] : []
      } catch (error) {
        console.error('Error in tourTypeDesHover:', error);
        this.tourTypes = [];
      }
    }
  }

  hotOfferDesHover(slug: any, i: any) {
    if (slug !== this.lastSlug) {
      this.hotOfferSlug = slug
      this.excursionsIndex = i

      // SAFE: Filter hot_offer_packages with proper array checks
      try {
        let arr = Array.isArray(this.hot_offer_packages) ? this.hot_offer_packages.filter(res => res) : [];
        let arr2 = arr.filter((hot: any) => {
          return Array.isArray(hot) && hot[0]?.destination?.slug == slug
        })
        this.hotOffers = Array.isArray(arr2[0]) ? arr2[0] : []
      } catch (error) {
        console.error('Error in hotOfferDesHover:', error);
        this.hotOffers = [];
      }
    }
  }

  routedExcursion(s: any) {
    this._router.navigate([`/all-destinations/${this.Excursionslug}/travel-excursions/${s}`])
    // console.log('Navigating to:', `/all-destinations/${this.Excursionslug}/travel-excursions/${s}`);


  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    // SAFE: Only execute DOM manipulation in browser
    if (!this.isBrowser) {
      return;
    }

    const offset = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    const navBarElement = this.document.getElementById("nav-bar");

    if (!navBarElement) {
      return;
    }

    if (offset >= 10) {
      this.renderer.addClass(navBarElement, "position-fixed");
      this.renderer.addClass(navBarElement, "sticky-top");
    } else {
      this.renderer.removeClass(navBarElement, "sticky-top");
    }
  }

  ddToggle(): void {
    // SAFE: Only execute browser-specific code in browser environment
    if (!this.isBrowser) {
      return;
    }

    // SAFE: Check for mobile using a more reliable method
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && this.closee?.nativeElement) {
      this.closee.nativeElement.click();
    }
  }
}
