import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';



@Component({
    selector: 'app-all-cruises',
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
    templateUrl: './all-cruises.component.html',
    styleUrls: ['./all-cruises.component.css']
})

export class AllCruisesComponent implements OnInit {
  title: any;
  descount: any;
  x = 1;
  max = 5;
  maxx:number=5;
  isReadonly = false;
  num: any;
  name: any;
  desName:any;
  desSlug:any;
  cruName:any;
  count:any
  filter:any
  nameCountry = '';
  hot: any[] = []
  rangeSDay:any;
  rangeMDay:any;
  rangePric:any
  range:any
  rangePriceMax:any
  minDay:any=1
  maxDay:any=30
  minRate:any
  MaxRate:any
  rate = 1;
  rangePrice:any
  readonly = true
  overStar: number | undefined;
  percent: number | undefined;
  id: any;
  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = true;
  noData: boolean=false;
  loading:boolean=true

  tourType:any[]=['Family Friendly','Adventure or Sporting','Sightseeing','Combining','Spiritual'
  ,'Multi Country','Medical','Meditation','Romantic & Honeymoon','Indulgence & Luxury','Culinary, Food & Wine','Shore Excursion','Extended',]
  tourtype:any="";
  rating :any

 idpackage: any;
  form: UntypedFormGroup;
  catSlug: any;
  category: any;
  category_name: any;
  destination_slug: any;
  destination_description: any;
  destination_banner: any;
  destination_name: any;
  category_slug: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private _excursions: HomeserviceService,
    private _Active:ActivatedRoute ,
     private modalService: NgbModal,
     private fb: UntypedFormBuilder , private seo:SeoService,
     private schema:SchemaInjectionService
     )
      {
        this.form = this.fb.group({rating:[1,Validators.required]})



    }

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }



  ngOnInit(): void {
    this._Active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('slug')


      this._excursions.getCruisesFilter(this.id , 0 ,10000,1,30,1,5).subscribe(result => {
        //  this.getSeo(result)
        this.category_slug= result.data.category.slug

        this._excursions.getSeoCategory(this.id , this.category_slug ).subscribe({
          next: res => {
              this.getSeo(res)
              this.loading=false

          }
        })

        this.filter = result.data.cruises

        this.category_name= result.data.category.name

        this.destination_slug= result.data.destination.slug
        this.destination_description= result.data.destination.description
        this.destination_banner= result.data.destination.banner
        this.destination_name= result.data.destination.name
        this.count = result.data.cruises.length
        this.desSlug = result.data.destination.slug

        this.desName = result.data.destination.name
        this.descount = result.data.discount + "%"
        this.hot = result.data.hot_offer
        this.nameCountry = result.data.destination.name;
        this.loading=false

      })



    })


    //    this._excursions.getOneDestinationDetails(1).subscribe(res => {
    //    this.cruName = res.data[0].categories[3].name;
    //    this.catSlug = this.cruName = res.data[0].categories[3].slug;

    //  })

  }
  getSeo(result:any){
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
      }
 // RANGE PRICE
 rangePri1(val:any){
  this.loading=true

  this.rangePric = val.value
  this._excursions.getCruisesFilter(this.id , this.rangePric || 1 ,this.rangePrice || 10000 ,this.rangeSDay||1, this.rangeMDay||30,1,5).subscribe(result => {
    this.filter = result.data.cruises
    this.count = result.data.cruises.length;
    this.loading=false
  })
}
rangePri2(val:any){
  this.loading=true
  this.rangePrice = val.value;
  this._excursions.getCruisesFilter(this.id , this.rangePric ,this.rangePrice || 10000, this.rangeSDay||1, this.rangeMDay||30,1,5).subscribe(result => {
    this.filter = result.data.cruises
    this.count = result.data.cruises.length;
    this.loading=false
  })
}
//  RANGE DAYS
rangeStartDay(minD:any){
  this.loading=true
this.rangeSDay = minD.value;
this._excursions.getCruisesFilter(this.id , this.rangePric || 0 ,this.rangePrice || 10000  ,this.rangeSDay,30,1,5).subscribe(result => {
  this.filter = result.data.cruises
  this.count = result.data.cruises.length;
  this.loading=false

})
}
rangeEndDay(val:any){
  this.loading=true
this.rangeMDay = val.value;
this._excursions.getCruisesFilter(this.id , this.rangePric || 0 , this.rangePrice || 10000 ,this.rangeSDay||1,this.rangeMDay,1,5).subscribe(result => {
  this.filter =result.data.cruises;
  this.count = result.data.cruises.length;
  this.loading=false
})
}
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSafeContent(content: string): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    return content;
  }
}
