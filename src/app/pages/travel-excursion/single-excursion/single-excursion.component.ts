import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Blog } from '../../../core/interfaces/blog';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SeoService } from '../../../core/services/seo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';

  import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
 import { PackageIncludedComponent } from "../../../shared/components/package-included/package-included.component";
import { PricesPolicyComponent } from "../../../shared/components/prices-policy/prices-policy.component";
import { PriceDataComponent } from "../../../shared/components/price-data/price-data.component";
import { ReviewsComponent } from "../../../shared/components/reviews/reviews.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { SafePipe } from "../../../shared/pipes/safe-url.pipe";
import { SplanderComponent } from "../../../shared/components/splander/splander.component";
import { GalleryNewComponent } from "../../../shared/components/gallery-new/gallery-new.component";
import { CommonModule } from '@angular/common';
import { SafeHtmlComponent } from "../../../shared/components/safe-html/safe-html.component";


@Component({
    selector: 'app-single-excursion',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        PackageIncludedComponent,
        PricesPolicyComponent,
        PriceDataComponent,
        ReviewsComponent,
        ScrollButtonComponent,
        SafePipe,
        SplanderComponent,
        GalleryNewComponent,
        CommonModule,
    ],
    templateUrl: './single-excursion.component.html',
    styleUrls: ['./single-excursion.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})


export class SingleExcursionComponent implements OnInit ,OnDestroy{
  type = true;
  lights: any = [];
  banener: any = [];
  contact: any = [];
  idex: any;
  id: any;
  nameEx: any;
  imageEx: any;
  exName: any;
  selectTrue = true;
  imageFalse = '';
  imageTrue = 'assets/imgs/right.png';
  num: any;
  img = [];
  desSlug: any;
  included: any = [];
  prices: any;
  startPrices: any;
  desName: any;
  reviews: any;
  image = '../../../../../assets/imgs/default-reviews.png';
  max = 5;
  isReadonly = true;
  optional: Blog[] = [];
  codeDone: any;
  cityName: any;
  citySlug: any;
  price_policy: any;
  travel_schedule: any;
  repeated_travellers: any;
  payment_policy: any;
  galleryy: any;
  loading:boolean=true
  script: any;
  url:any
  final!: any;

  subscription:Subscription = new Subscription()

  constructor(
    public _excursion: HomeserviceService,
    private _Active: ActivatedRoute,
    private seo:SeoService,
    private router: Router,
    public sanitizer: DomSanitizer ,
    private schema :SchemaInjectionService
    ) {}




  ngOnInit(): void {
    this.subscription.add( this._Active.paramMap.subscribe((params: ParamMap) => {
      this.idex = params.get('excursion');
      this.id = params.get('id');
      this._excursion.getSingleExcursion(this.id,this.idex).subscribe({
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
          this.included = result.data[0];

          this.loading=false
          this.script = result.data[0].code;



          this.galleryy = result.data[0].gallery;
          this.cityName = result.data[0].city.name;
          this.citySlug = result.data[0].city.slug;
          this.nameEx = result.data[0].name;
          this.imageEx = result.data[0].banner;
          this.reviews = result.data[0].reviews;
          this.price_policy = result.data[0].price_policy
        },
        error: (e) => {
          this.router.navigate(['/404']);
        },
       });

      this._excursion.getDestinationExcursions(this.id).subscribe((result) => {
        this.desSlug = result.data.destination[0].slug;

        this.desName = result.data.destination[0].name;
      });
    }));
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
