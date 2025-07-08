import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Component({
    imports: [RouterLink, TranslateModule, AskExpertBtnComponent, NgbRatingModule, FormsModule, NgStyle, SafeHtmlComponent],
    selector: 'app-multi-country-packages',
    templateUrl: './multi-country-packages.component.html',
    styleUrls: ['./multi-country-packages.component.css']
})
export class MultiCountryPackagesComponent implements OnInit ,OnDestroy{

  loading: boolean = true;
  Filter: any;

  x: number = 1;
  isReadonly = true;
  banner: any;
  nameCategories: any;
  description: any;
  count!: number;
  max=5
  subscription:Subscription = new Subscription()

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private _singleDes: HomeserviceService,
    private ngMod: NgbModal,

    private seo: SeoService,
    private schema:SchemaInjectionService
  ) {}
  ngOnInit(): void {
    // Add timeout protection for SSR
    const timeoutId = setTimeout(() => {
      console.warn('Multi-country-packages component initialization timeout, proceeding with fallback data');
      this.loading = false;
    }, 8000);

    this.subscription.add( this._singleDes.getPage('multi-country-tours').subscribe({
      next: (res) => {
        try {
          //seo
          this.seo.data.title = res.category?.seo?.title || 'Multi Country Tours'
          this.seo.data.description = res.category?.seo?.description || 'Explore multiple countries with our tour packages'
          this.seo.data.robots = res.category?.seo?.robots || 'index,follow'
          this.seo.data.keywords = res.category?.seo?.keywords || 'multi country tours, travel packages'
          this.seo.data.fbDes = res.category?.seo?.facebook_description || ''
          this.seo.data.fbImg = res.category?.seo?.facebook_image || ''
          this.seo.data.fbTit = res.category?.seo?.facebook_title || ''
          this.seo.data.twitterDes = res.category?.seo?.twitter_description || ''
          this.seo.data.twitterImage = res.category?.seo?.twitter_image || ''
          this.seo.data.twitterTit = res.category?.seo?.twitter_title || ''
          this.seo.updateTags(this.seo.data)
          if (res.category?.seo?.schema) {
            this.schema.injectSchema(res.category.seo.schema)
          }
          this.banner = res.category?.banner || ''
          this.nameCategories = res.category?.name || 'Multi Country Tours'
          this.description = res.category?.description || ''
        } catch (error) {
          console.error('Error processing page data:', error);
          // Set fallback data
          this.banner = '';
          this.nameCategories = 'Multi Country Tours';
          this.description = '';
        }
      },
      error: (error) => {
        console.error('Error loading page data:', error);
        // Set fallback SEO data
        this.seo.data.title = 'Multi Country Tours - Ask Aladdin'
        this.seo.data.description = 'Explore multiple countries with our comprehensive tour packages'
        this.seo.data.robots = 'index,follow'
        this.seo.data.keywords = 'multi country tours, travel packages, ask aladdin'
        this.seo.updateTags(this.seo.data)
        this.banner = '';
        this.nameCategories = 'Multi Country Tours';
        this.description = '';
      }
    }))

    this.subscription.add(this._singleDes.getMultiCoutryTours().subscribe({
      next: (result) => {
        clearTimeout(timeoutId);
        this.Filter = result.data?.packages || []
        this.count = result.data?.packages?.length || 0
        this.loading = false
      },
      error: (error) => {
        clearTimeout(timeoutId);
        console.error('Error loading multi-country tours:', error);
        this.Filter = []
        this.count = 0
        this.loading = false
      }
    }));
  }

  openVerticallyCentered(content: any) {
    this.ngMod.open(content, { centered: true });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
