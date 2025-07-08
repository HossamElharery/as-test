import { Hotel } from './../../../core/interfaces/hotel';
import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SeoService } from '../../../core/services/seo.service';
import { Location, NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { GalleryNewComponent } from "../../../shared/components/gallery-new/gallery-new.component";
import { SafePipe } from "../../../shared/pipes/safe-url.pipe";
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { BookingEnquiryHotelComponent } from '../../../shared/components/side-bar/booking-enquiry-hotel/booking-enquiry-hotel.component';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';

@Component({
    selector: 'app-hotel',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        NgbRatingModule,
        NgbCollapseModule,
        FormsModule,
        BookingEnquiryHotelComponent,
        GalleryNewComponent,
        SafePipe,
        ExpertReviewsComponent,
        ScrollButtonComponent,
        NgStyle,
        SafeHtmlComponent,
    ],
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit,OnDestroy
{

  name: any;
  packname: any;
  galleryy: any;
  loading:boolean=true
  public isBrowser: boolean;

   hotel: Hotel[] = []
   subscription:Subscription = new Subscription()
  img=[];
  hotelTrue = true
  panner:any
  pannerDescription:any
  hotelslug: any
  max: any
  isReadonly = true;
  desName: any;

  constructor(private _hotel: HomeserviceService,
    private _active: ActivatedRoute,
    private seo:SeoService,private _location: Location,    private router: Router,
    private schema:SchemaInjectionService,
    @Inject(PLATFORM_ID) private platformId: Object

) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.subscription.add( this._active.paramMap.subscribe((params:ParamMap)=>{
      this.hotelslug=params.get('hotel')
      this.desName= this.router.url.split('/')[2]
      this.subscription.add(this._hotel.getSingleHotel(this.desName,this.hotelslug).subscribe


      ({

        next: (result) => {
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
          this.hotel = result.data;

  this.name = result.data[0].name;
  this.galleryy = result.data[0].gallery;
  this.panner = result.data[0].banner;
  this.pannerDescription = result.data[0].description;
  this.panner = result.data[0].banner;
  this.loading=false

        },
        error: () => {
           this.router.navigate(['/404']);

        },
       }))





    }))


  }

  backClicked() {
    this._location.back();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSafeContent(content: any): string {
    if (!content) return '';
    return typeof content === 'string' ? content : String(content);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

