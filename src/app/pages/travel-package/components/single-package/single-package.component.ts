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
          //seo
          this.seo.data.title = result.data[0].seo.title
          this.seo.data.description =  result.data[0].seo.description
          this.seo.data.robots =  result.data[0].seo.robots
          this.seo.data.keywords =  result.data[0].seo.keywords
          this.seo.data.fbDes =  result.data[0].seo.facebook_description
          this.seo.data.fbImg =  result.data[0].seo.facebook_image
          this.seo.data.fbTit =  result.data[0].seo.facebook_title
          this.seo.data.twitterDes =  result.data[0].seo.twitter_description
          this.seo.data.twitterImage =  result.data[0].seo.twitter_image
          this.seo.data.twitterTit =  result.data[0].seo.twitter_title
          this.seo.updateTags(this.seo.data)
          if (result.data[0].seo.schema) {
            this.schema.injectSchema(result.data[0].seo.schema)
          }
          // end seo
          this.lights = result.data[0]
          this.tours = result.data[0]
          console.log(this.lights);


          this.banner_alt=result.data[0].banner_alt
          this.desName = result.data[0].destination.name;
          this.desSlug = result.data[0].destination.slug;
         this.toHighlight= result.data[0].highlight
         this.loading=false
         this.travel_experiences= result.data[0].travel_experiences
          this.flag1 = result.data[0].standard_hotels
          this.flag2= result.data[0].comfort_hotels
          this.flag3 = result.data[0].deluxe_hotels
          this.flag4 = result.data[0].cruise_hotels
          this.pricesCompnent = result.data[0].prices;
          // this.flag = result.data[0].prices[0]?.attributes.season_start_date
          // console.log(this.flag);
          this.ptional = result.data[0].optional_tours
          this.price_policy = result.data[0].price_policy
          this.payment_policy = result.data[0].payment_policy
          this.repeated_travellers = result.data[0].repeated_travellers
          this.travel_schedule = result.data[0].travel_schedule
          this.video = result.data[0].videos
          this.location_url= result.data[0].location_package_map
          this.getHeight()
          this.packName = result.data[0].category.name
          this.subscription.add(this._highlights.getOneDestinationDetails(2).subscribe(res => {

            this.overBanner = result.data[0].image_over_banner;
          }))
        },
        error: (e) => {
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
