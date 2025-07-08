import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/interfaces/category';
import { destination } from '../../../../core/interfaces/destination';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { CommonModule } from '@angular/common';
import { innerHtmlPipe } from "../../../../shared/pipes/innerHtml/innerHtml.pipe";
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HotRelatedComponent } from "../hot-related/hot-related.component";
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Component({
    selector: 'app-one-destination',
    imports: [RouterLink, CommonModule, TranslateModule, AskExpertBtnComponent, CarouselModule, HotRelatedComponent, SafeHtmlComponent],
    templateUrl: './one-destination.component.html',
    styleUrl: './one-destination.component.scss'
})
export class OneDestinationComponent implements OnInit,OnDestroy {
  private unSub!:Subscription
  loading:boolean=true
  count: any
  id:any;
  singleDestination:destination[]=[]
  ides:any;
  categoryFooter:Category[]=[]
  singleDestinationContent:destination[]=[]
  Title:any;
  Meta:any;
  image = '../../../../../assets/imgs/Egypt-Shopping-Guide.jpg'
  errors: any;
  desSlug: any;
  banner: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor( private _Home : HomeserviceService ,
    private _active:ActivatedRoute   ,
      private seo:SeoService,
      private router:Router,
      private schema :SchemaInjectionService
      ) { }

  ngOnInit(): void {

    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('slug')

      this.unSub= this._Home.getOneDistination(this.id).subscribe({
        next: (res) => {

          if(res.data.length!==0){

            this.getSeo(res)
            this.singleDestination = res.data
            this.desSlug = res.data.slug
             this.singleDestination.filter(idData => {
               let idDes = idData.id
               this._Home.getOneDestinationDetails(idDes).subscribe(result => {
                 this.singleDestinationContent = result.data[0].categories;

                 this.banner = result.data[0]?.destination?.banner;
                 this.loading=false
               })
               this._Home.categoryFooter(idDes).subscribe(res => {
                 this.categoryFooter = res.data
               })
             })

          }else{
            this.router.navigate(['/404']);

          }



        },
        error: (e) => {

          this.router.navigate(['/404']);

        },
       });

    })

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
  if (result.data[0].seo.schema) {
    this.schema.injectSchema(result.data[0].seo.schema)
  }
  this.seo.updateTags(this.seo.data)
  // end seo
    }

  ngOnDestroy(): void {
    this.unSub.unsubscribe()


  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:5000,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  customOwl: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:5000,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
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
