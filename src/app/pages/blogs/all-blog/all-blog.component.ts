import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { destination } from '../../../core/interfaces/destination';
import { destinationBlog } from '../../../core/interfaces/destinationBlog';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { TranslateModule } from '@ngx-translate/core';

import { AskExpertBtnComponent } from "../../../shared/components/ask-expert-btn/ask-expert-btn.component";

import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgStyle, SlicePipe } from '@angular/common';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';


@Component({
    selector: 'app-all-blog',
    imports: [
        RouterModule,
        TranslateModule,
        AskExpertBtnComponent,
        ScrollButtonComponent,
        NgxPaginationModule, NgStyle,  SafeHtmlComponent
    ],
    templateUrl: './all-blog.component.html',
    styleUrls: ['./all-blog.component.css'],
    host: {
      'ngSkipHydration': 'true'
    }
})

export class AllBlogComponent implements OnInit ,OnDestroy{
  private unSubBlogs!:Subscription
  blogContainer:destinationBlog[] = [];
  blog_name: any;
  blogName:any;
  blogDes: string = '';
  desName: string = '';
  desSlug: string ='';
  category: string = '';
  title!: String;
  id:any;
  allBlog:destination[]=[];
  banner: any;
  loading:boolean=true
  page: number = 1;
  totalItems: any;
  itemsPerPage: number=9;
  currentPage:number=1

  loadingDes:boolean=true

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private _blogs:HomeserviceService , private _active:ActivatedRoute , private seo:SeoService , private schema :SchemaInjectionService) {}
  ngOnInit(): void {
    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('slug')
      this.loadingDes=true

      this._blogs.getSeoCategory(this.id , 'blogs' ).subscribe({
        next: res => {
          this.getSeo(res)
          this.allBlog = res.data
          this.banner = res.data[0].banner
          this.loadingDes=false

        }
      })
    this.unSubBlogs= this._blogs.getDestinationBlogs(this.id,this.currentPage).subscribe(result => {
      this.blogContainer = result.data.blogs
      this.totalItems = result.paginator.total;
      this.loading=false
      this.blog_name = result.data.destination[0].name + " Blogs";
      this.blogDes = result.data.destination[0].description;
      this.desName = result.data.destination[0].name
      this.desSlug = result.data.destination[0].slug
      this.category = result.data.category.slug
      this.blogName = result.data.category.name
    })
    })


    }

    gty(page: any) {
      this.loading=true

      this.currentPage = page;
      window.scroll({
        top: 460,
        left: 0,
        behavior: 'smooth'
 });
      this._blogs.getDestinationBlogs(this.id,this.currentPage).subscribe((data: any) => {
          this.blogContainer = data.data.blogs
          this.loading=false
        });
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

        numSequence(n: number): Array<number> {
          return Array(n);
        }

        getSafeContent(content: string, maxLength?: number): string {
          // Always return empty string for null/undefined to ensure consistent DOM
          if (!content || content === null || content === undefined) {
            return '';
          }

          // Convert to string and trim
          const stringContent = String(content).trim();
          if (!stringContent) {
            return '';
          }

          // Apply maxLength if specified
          const finalContent = maxLength ? stringContent.slice(0, maxLength) : stringContent;

          // Return the content - SafeHtmlComponent will handle sanitization
          return finalContent;
        }

    ngOnDestroy(): void {
      this.unSubBlogs.unsubscribe()

    }


  }



