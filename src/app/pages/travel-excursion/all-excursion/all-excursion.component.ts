import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { destination } from '../../../core/interfaces/destination';
import { Excursions } from '../../../core/interfaces/excursions';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { SeoService } from '../../../core/services/seo.service';
import { Subscription } from 'rxjs';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AskExpertBtnComponent } from "../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';




@Component({
    selector: 'app-all-excursion',
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
    templateUrl: './all-excursion.component.html',
    styleUrls: ['./all-excursion.component.css'],
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

export class AllExcursionComponent implements OnInit,OnDestroy{
  x = 1;
  max = 5;
  isReadonly = true;
  readonly = true
  num: any;
  name: any;
  overStar: number | undefined;
  percent: number | undefined;
  title: any;
  citySlug: any;
  cityName: any;
  cityBanner: any;
  des: any ;
  catSlug: any;
  description: any;

  subscription:Subscription = new Subscription()
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }
  id: any;
  idpackage: any;
  getDestinationExcursions: Excursions[] = [];
  exContent:destination[] = [];
  desName:any;
  desSlug:any;
  exName:any;
  count:any
  isCollapsed = false;
  isCollapsed2 = true;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  tourType:any[]=['Family Friendly','Adventure or Sporting','Sightseeing','Combining','Spiritual'
  ,'Multi Country','Medical','Meditation','Romantic & Honeymoon','Indulgence & Luxury','Culinary, Food & Wine','Shore Excursion','Extended',]
  tourtype:any="";
  rating :any
  rangeSDay:any;
  rangeMDay:any;
  rangePric:any
  range:any
  rangePriceMax:any
  minDay:any
  maxDay:any
  minRate:any
  MaxRate:any
  rate = 1;
  rangePrice:any
  Filter:any
  idCity:any=1
  cities = []
  maxx:number=5;
  loading:boolean=true

  public form : UntypedFormGroup | undefined
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private _excursions: HomeserviceService,
    private _Active:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private seo:SeoService,
    private schema:SchemaInjectionService
  ) {


  }

  ngOnInit(): void {
    this.subscription.add( this._Active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('city')
      this.des=params.get('id')
      this._excursions.allExcursionCity(this.id).subscribe(result => {

        this.getSeo(result)
        this.Filter = result.data.excursions
        this.cities = result.data
        this.description = result.data.city[0].description
        this.cityName = result.data.city[0].name
        this.cityBanner = result.data.city[0].banner
        this.loading=false
        this.desName = result.data.destination[0].name;
        this.desSlug = result.data.destination[0].slug;
        this.exName = result.data.excursion_name;
        this.name = result.data;
        this.count = result.data.excursions.length;
      });

      this._excursions.getOneDestinationDetails(1).subscribe(res => {
        this.exContent = res.data[0].categories;
        this.exName = res.data[0].categories[2].name;
      })
    }))
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSeo(result:any){
    //seo
    this.seo.data.title = result.data.seo[0].title
    this.seo.data.description =  result.data.seo[0].description
    this.seo.data.robots =  result.data.seo[0].robots
    this.seo.data.keywords =  result.data.seo[0].keywords
    this.seo.data.fbDes =  result.data.seo[0].facebook_description
    this.seo.data.fbImg =  result.data.seo[0].facebook_image
    this.seo.data.fbTit =  result.data.seo[0].facebook_title
    this.seo.data.twitterDes =  result.data.seo[0].twitter_description
    this.seo.data.twitterImage =  result.data.seo[0].twitter_image
    this.seo.data.twitterTit =  result.data.seo[0].twitter_title

    this.seo.updateTags(this.seo.data)
    if (result.data.seo[0].schema) {
      this.schema.injectSchema(result.data.seo[0].schema)
    }
    // end seo
      }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
// // RANGE PRICE
rangePri1(val:any){
  this.rangePric = val.value
  this._excursions.getExcursionsFilter(this.des , this.rangePric || 1 ,this.rangePrice || 10000 ,this.rangeSDay||1, this.rangeMDay||30,1,5,this.id||10).subscribe(result => {
    this.Filter = result.data.excursions;

    this.cities=result.data.city
    this.count = result.data.excursions.length;
  })
}
rangePri2(val:any){
  this.rangePrice = val.value;
  this._excursions.getExcursionsFilter(this.des , this.rangePric ,this.rangePrice || 10000, this.rangeSDay||1, this.rangeMDay||30,1,5,this.id).subscribe(result => {


    this.Filter = result.data.excursions;
    this.cities=result.data.city
    this.count = result.data.excursions.length;
  })
}
//  RANGE DAYS
rangeStartDay(minD:any){
this.rangeSDay = minD.value;
this._excursions.getExcursionsFilter(this.des , this.rangePric || 0 ,this.rangePrice || 10000  ,this.rangeSDay,30,1,5,this.id).subscribe(result => {
  this.Filter = result.data.excursions;

    this.cities=result.data.city
    this.count = result.data.excursions.length;
})
}
rangeEndDay(val:any){
this.rangeMDay = val.value;

this._excursions.getExcursionsFilter(this.des , this.rangePric || 0 , this.rangePrice || 10000 ,this.rangeSDay||1,this.rangeMDay,1,5,this.id).subscribe(result => {
  this.Filter = result.data.excursions;


  this.cities=result.data.city


  this.count = result.data.excursions.length;


})
}



citiesEX(val:any){
  this.rangeMDay = val.value;

  this._excursions.getExcursionsFilter(this.des , this.rangePric || 0 , this.rangePrice || 10000 ,this.rangeSDay||1,this.rangeMDay,1,5,this.id).subscribe(result => {
    this.Filter = result.data.excursions;
    this.cities=result.data.city


    this.count = result.data.excursions.length;

  })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSafeContent(content: string, maxLength?: number): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    const stringContent = String(content);
    return maxLength ? stringContent.slice(0, maxLength) : stringContent;
  }
}
