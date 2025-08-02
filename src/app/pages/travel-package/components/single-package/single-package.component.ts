import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SplanderComponent } from "../../../../shared/components/splander/splander.component";
import { PriceDataComponent } from "../../../../shared/components/price-data/price-data.component";
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
 import { ReviewsComponent } from "../../../../shared/components/reviews/reviews.component";
import { ExperiencesComponent } from "../../../../shared/components/experiences/experiences.component";
import { StartFromComponent } from "../../../../shared/components/side-bar/start-from/start-from.component";
import { ExpertReviewsComponent } from "../../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { SideBarComponent } from "../../../../shared/components/side-bar/side-bar.component";
import { OptionalExpertsComponent } from "../../../../shared/components/side-bar/optional-experts/optional-experts.component";
import { ScrollButtonComponent } from "../../../../shared/components/scroll-button/scroll-button.component";
import { WeAreComponent } from "../we-are/we-are.component";
import { TourBookingComponent } from "../../../../shared/components/side-bar/tour-booking/tour-booking.component";
import { AccomodationComponent } from "../../../../shared/components/accomodation/accomodation.component";
import { HightlightesComponent } from "./hightlightes/hightlightes.component";
import { PackageIncludedComponent } from "../../../../shared/components/package-included/package-included.component";
import { PricesPolicyComponent } from "../../../../shared/components/prices-policy/prices-policy.component";
import { SafePipe } from "../../../../shared/pipes/safe-url.pipe";
import { NgStyle, isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from "../../../../shared/components/safe-html/safe-html.component";

declare const $ :any

@Component({
    imports: [RouterLink, TranslateModule, NgStyle, SplanderComponent, PriceDataComponent, AskExpertBtnComponent,   ReviewsComponent, ExperiencesComponent, StartFromComponent, ExpertReviewsComponent, SideBarComponent, OptionalExpertsComponent, ScrollButtonComponent, WeAreComponent, TourBookingComponent, AccomodationComponent, HightlightesComponent, PackageIncludedComponent, PricesPolicyComponent, SafePipe, SafeHtmlComponent],
    selector: 'app-single-package',
    templateUrl: './single-package.component.html',
    styleUrls: ['./single-package.component.css']
})
export class SinglePackageComponent implements OnInit  ,OnDestroy {
  type = true
  lights: any = [];
  Meta: any;
  flag4:any
  flag3:any
  flag2:any
  flag1:any
  id: any
  ifTrue = false
  packName: any;
  desName: any;
  desSlug: any;
  idPack: any;
  overBanner: any;
  video: any = []
  ptional:any
  image = "../../../../assets/imgs/default-reviews.png"
  overBaner="../../../../assets/imgs/trustpilot.webp"
  max=5;
  price_policy: any;
  travel_schedule: any;
  repeated_travellers: any;
  payment_policy: any;
  banner_alt: any;
  loaderFalse:boolean = false
  pricesCompnent: any;
  // flag: any;
  toHighlight: any;
  travel_experiences: any;
  loading:boolean=true
  currentSection = 'section1';
  currentt: any;
  location_url: any;
  remainingHeight:any
  price: any;
  included: any;
  travv: any;
  highlightss: any;
  accomodationn: any;
  videoss: any;
  optionall: any;
  revieewss: any;
  map: any;
  public isBrowser: boolean;
  tours: any;

  subscription:Subscription = new Subscription()

  @ViewChild('remainingHeight') remainingHeightt!: ElementRef;
  @ViewChild('price') pricee!: ElementRef;
  @ViewChild('included') includedd!: ElementRef;
  @ViewChild('travv') travvv!: ElementRef;
  @ViewChild('opti') opti!: ElementRef;
  @ViewChild('accom') accom!: ElementRef;
  @ViewChild('mapp') mapp!: ElementRef;
  @ViewChild('rev') rev!: ElementRef;
  @ViewChild('highli') highli!: ElementRef;
  @ViewChild('videoo') videoo!: ElementRef;

  constructor(public _highlights: HomeserviceService, private _active: ActivatedRoute,private schema:SchemaInjectionService,  private seo:SeoService , private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.subscription.add(this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id')
      this.idPack=params.get('slug')
      this.subscription.add(this._highlights.getSinglepackage(this.id,this.idPack).subscribe({
        next: (result) => {
          try {
            // SAFE: Add comprehensive null checks
            const packageData = result?.data?.[0];
            const seoData = packageData?.seo;

            if (packageData && seoData) {
              //seo
              this.seo.data.title = seoData.title || 'Ask Aladdin Travel Package';
              this.seo.data.description = seoData.description || '';
              this.seo.data.robots = seoData.robots || 'index,follow';
              this.seo.data.keywords = seoData.keywords || '';
              this.seo.data.fbDes = seoData.facebook_description || '';
              this.seo.data.fbImg = seoData.facebook_image || '';
              this.seo.data.fbTit = seoData.facebook_title || '';
              this.seo.data.twitterDes = seoData.twitter_description || '';
              this.seo.data.twitterImage = seoData.twitter_image || '';
              this.seo.data.twitterTit = seoData.twitter_title || '';

              this.seo.updateTags(this.seo.data);

              if (seoData.schema) {
                this.schema.injectSchema(seoData.schema);
              }

              // SAFE: Set package content with null checks
              this.lights = packageData;
              this.tours = packageData;
              this.banner_alt = packageData.banner_alt || '';
              this.desName = packageData.destination?.name || '';
              this.desSlug = packageData.destination?.slug || '';
              this.toHighlight = packageData.highlight || [];
              this.travel_experiences = packageData.travel_experiences || [];
              this.flag1 = packageData.standard_hotels || [];
              this.flag2 = packageData.comfort_hotels || [];
              this.flag3 = packageData.deluxe_hotels || [];
              this.flag4 = packageData.cruise_hotels || [];
              this.pricesCompnent = packageData.prices || [];
              this.ptional = packageData.optional_tours || [];
              this.price_policy = packageData.price_policy || '';
              this.payment_policy = packageData.payment_policy || '';
              this.repeated_travellers = packageData.repeated_travellers || '';
              this.travel_schedule = packageData.travel_schedule || '';
              this.video = packageData.videos || [];
              this.location_url = packageData.location_package_map || '';
              this.packName = packageData.category?.name || '';
            } else {
              console.warn('Package data is incomplete or missing');
              // Set fallback data
              this.lights = {};
              this.tours = {};
              this.banner_alt = '';
              this.desName = '';
              this.desSlug = '';
              this.toHighlight = [];
              this.travel_experiences = [];
              this.flag1 = [];
              this.flag2 = [];
              this.flag3 = [];
              this.flag4 = [];
              this.pricesCompnent = [];
              this.ptional = [];
              this.price_policy = '';
              this.payment_policy = '';
              this.repeated_travellers = '';
              this.travel_schedule = '';
              this.video = [];
              this.location_url = '';
              this.packName = '';
            }

            this.loading = false;
            this.getHeight();

            // SAFE: Handle destination details call
            this.subscription.add(this._highlights.getOneDestinationDetails(2).subscribe({
              next: (res) => {
                this.overBanner = packageData?.image_over_banner || '';
              },
              error: (error) => {
                console.warn('Error loading destination details:', error);
                this.overBanner = '';
              }
            }));
          } catch (error) {
            console.error('Error processing package data:', error);
            this.loading = false;
            // Set fallback data
            this.lights = {};
            this.tours = {};
            this.banner_alt = '';
            this.desName = '';
            this.desSlug = '';
            this.toHighlight = [];
            this.travel_experiences = [];
          }
        },
        error: (e) => {
          console.error('Error loading package:', e);
          this.loading = false;
          this.router.navigate(['/404']);
        },
       }));

    }));
  }

@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  let section = document.querySelectorAll(".section");
    let sections :any = {};
    Array.prototype.forEach.call(section, function (e) {
      sections[e.id] = e.offsetTop;
    });
    let scrollPosition :any = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i in sections) {
      if (sections[i] <= parseInt(scrollPosition)-500) {
        document.querySelector(".actives")?.setAttribute("class", " ");
        document.querySelector("div[href*=" + i + "]")?.setAttribute("class", "actives");
      }
    }
}

getHeight():void{
   this.remainingHeight = this.remainingHeightt?.nativeElement?.offsetHeight?.parseInt;
  this.price = this.pricee?.nativeElement?.offsetHeight?.parseInt;
  this.included = this.includedd?.nativeElement?.offsetHeight?.parseInt;
  this.travv = this.travvv?.nativeElement?.offsetHeight?.parseInt;
  this.optionall = this.opti?.nativeElement?.offsetHeight?.parseInt;
  this.accomodationn = this.accom?.nativeElement?.offsetHeight?.parseInt;
  this.map = this.mapp?.nativeElement?.offsetHeight?.parseInt;
  this.revieewss = this.rev?.nativeElement?.offsetHeight?.parseInt;
  this.highlightss = this.highli?.nativeElement?.offsetHeight?.parseInt;
  this.videoss = this.videoo?.nativeElement?.offsetHeight?.parseInt;
}


stopVideo(id:any):void{
  if (isPlatformBrowser(this.platformId)) {
    $(`#myModal${id}`).on('hidden.bs.modal', function (e:any) {

      $(`#myModal${id} iframe`).attr("src", $(`#myModal${id} iframe`).attr("src"));

    });
  }
}
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  openModel():void{
    this.ifTrue = !this.ifTrue
  }
  scrool(id:any):void
  {
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSafeContent(content: any): string {
    if (!content) return '';
    return typeof content === 'string' ? content : String(content);
  }

}
