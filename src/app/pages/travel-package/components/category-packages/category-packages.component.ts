import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer, } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { destination } from '../../../../core/interfaces/destination';
import { singleDestination } from '../../../../core/interfaces/single-destination';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';

import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
    imports: [TranslateModule],
    selector: 'app-category-packages',
    templateUrl: './category-packages.component.html',
    styleUrls: ['./category-packages.component.css']
})
export class CategoryPackagesComponent implements OnInit {


  max:number=5;
  rate = 1;

  count: any
  isReadonly = true;
  overStar: number | undefined;
  percent: number | undefined;
  modalService: any;
  cat: any;
  rangeSDay: any;
  destination_banner: any;
  destination_name: any;
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }
  image = "../../../../../../../assets/imgs/default.png"
  id: any;
  idpackage: any
  nameCountry = '';
  destinationContainer: singleDestination[] = []
  Filter:singleDestination[]=[]
  categorypack:singleDestination[]=[]
  Title: any;
  category: string = '';
  x: number = 1;
  hot: any[] = []
  descount: any
  price$:any;
  price:any
  packageContent:destination[] = []
  phone:any
  package_name:any

packName:any
  tourType:any[]=['Family Friendly','Adventure or Sporting','Sightseeing','Combining','Spiritual'
  ,'Multi Country','Medical','Meditation','Romantic & Honeymoon','Indulgence & Luxury','Culinary, Food & Wine','Shore Excursion','Extended',]
  resetStar(): void {
    this.overStar = void 0;
  }

  ide:any
  tourtype:any="";
  rating :any
  public form : UntypedFormGroup

  constructor(private _singleDes: HomeserviceService, private sanitizer: DomSanitizer,
    private schema:SchemaInjectionService,

    private _active: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private seo:SeoService,

    private ngMod: NgbModal) {
      this.form = this.fb.group({
        rating:[1,Validators.required]

      })

      this._active.paramMap.subscribe((params:ParamMap)=>{
        this.id=params.get('slug')
        this.cat=params.get('cat')
        this.ide=params.get('ide')


      })
      this._singleDes.getSingleDestinationFilter(this.id , 0 ,10000,1,30,1,5).subscribe(result => {
        this.getSeo(result)
        this.Filter = result.data.packages;
        this.count = result.data.packages.length;
        this.descount = result.data.discount + "%";
        this.hot = result.data.hot_offer;
        this.nameCountry = result.data.destination_name;

      })
    }


    getSeo(result:any){
      //seo
      this.seo.data.title = result.data.destination_seo_title
      this.seo.data.description =  result.data.destination_seo_description
      this.seo.data.robots =  result.data.destination_seo_robots
      this.seo.data.keywords =  result.data.destination_seo_keywords
      this.seo.data.fbDes =  result.data.seo.destination_facebook_description
      this.seo.data.fbImg =  result.data.seo.destination_facebook_image
      this.seo.data.fbTit =  result.data.seo.destination_facebook_title
      this.seo.data.twitterDes =  result.data.destination_twitter_description
      this.seo.data.twitterImage =  result.data.destination_twitter_image
      this.seo.data.twitterTit =  result.data.seo.destination_twitter_title
      this.seo.updateTags(this.seo.data)
      if (result.data[0].seo.schema) {
        this.schema.injectSchema(result.data[0].seo.schema)
      }
      // end seo
        }
    ngOnInit(): void {


      this._singleDes.getSingleDestination(this.id).subscribe(result => {
        this.destinationContainer = result.data
      })


      this._singleDes.getCategoryPackage(this.ide,this.cat).subscribe(result => {
        this.categorypack = result.data
        this.destination_banner=result.data[0].destination_banner
        this.destination_name=result.data[0].destination_name



        this.package_name = result.data.package_name

        this.count = result.data.length
        this.packName=result.data.categorypack


      })


      this._singleDes.getSocials().subscribe(result => {
        this.phone = result.data[0].phone1
      });


      this._singleDes.getOneDestinationDetails(this.id).subscribe(res => {
        this.category = res.data[0].categories[1].slug

      })
    }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openVerticallyCentered(content: any) {
    this.ngMod.open(content, { centered: true });


  }






}
