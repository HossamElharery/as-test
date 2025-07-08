
import { BlogSchemaInjectionService } from '../../../core/services/blog-schema-injection.service';
 import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from '../../../core/interfaces/blog';
import { destinationBlog } from '../../../core/interfaces/destinationBlog';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from "../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { RelatedCardRibbonComponent } from "../../../shared/components/related-card-ribbon/related-card-ribbon.component";
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { RelatedCardComponent } from "../../../shared/components/related-card/related-card.component";
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";
import { NgStyle, SlicePipe } from '@angular/common';



@Component({
    selector: 'app-blog',
    imports: [
        RouterModule,
        TranslateModule,
        AskExpertBtnComponent,
        RelatedCardRibbonComponent,
        ExpertReviewsComponent,
        RelatedCardComponent,
        ScrollButtonComponent,
        SafeHtmlPipe, NgStyle, SlicePipe
    ],
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit ,OnDestroy{

  singleBlog: Blog[] = [];
  idBlogs: any;
  id: any;
  alldestinationCards: destinationBlog[] = [];
  desSlug = "";
  desName='';
  loading:boolean=true
  ides :any;
  blogName:any;
  Title: any;
  related_pages: any;
  related_excursions: any;
  related_cruises: any;
  related_packages: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    public _homeService: HomeserviceService,
    private seo:SeoService,
    private router:Router,
    private schema : SchemaInjectionService,
    private _BlogSchemaInjectionService:BlogSchemaInjectionService,

  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id')
      this.idBlogs=params.get('blog')
      this.data( this.id,this.idBlogs)
    })
  }

  data(id:any,blog_slug:string){
    this._homeService.getSingleBlogs(this.id,blog_slug).subscribe({
      next: (result) => {
        //seo
        this.seo.data.title = result.blog[0].seo.title
        this.seo.data.description =  result.blog[0].seo.description
        this.seo.data.robots =  result.blog[0].seo.robots
        this.seo.data.keywords =  result.blog[0].seo.keywords
        this.seo.data.fbDes =  result.blog[0].seo.facebook_description
        this.seo.data.fbImg =  result.blog[0].seo.facebook_image
        this.seo.data.fbTit =  result.blog[0].seo.facebook_title
        this.seo.data.twitterDes =  result.blog[0].seo.twitter_description
        this.seo.data.twitterImage =  result.blog[0].seo.twitter_image
        this.seo.data.twitterTit =  result.blog[0].seo.twitter_title
        this.seo.updateTags(this.seo.data)
        if (result.blog[0].seo.schema) {
          console.log(result.blog);



          this._BlogSchemaInjectionService.injectSchema(result.blog[0].seo.schema);

          // this.schema.injectSchema(result.blog[0].seo.schema)
        }
        this.singleBlog = result.blog;
        this.blogName = result.blog[0].category.name;

        // end seo
        this.loading=false


 this.alldestinationCards = result.blog[0].related_blogs;
 this.related_pages = result.blog[0].related_pages;
 this.related_packages = result.blog[0].related_packages;

 this.related_cruises = result.blog[0].related_cruises;
 this.desSlug=result.blog[0].destination.slug
 this.desName =result.blog[0].destination.name
      },
      error: (e) => {

        this.router.navigate(['/404']);

      },
     });


  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: false,
    autoplayTimeout: 5000,
    pullDrag: true,
    margin: 8,
    dots: false,
    navSpeed: 700,
    navText: ["<", ">"],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };

  ngOnDestroy(): void {


  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
