import { ApplicationRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeService } from './services/home.service';
import { isPlatformBrowser } from '@angular/common';
import { first, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TopDestinationComponent } from './components/top-destination/top-destination.component';
import { BookHomeComponent } from './components/book-home/book-home.component';
import { HomeserviceService } from '../../core/services/homeservice.service';
import { SeoService } from '../../core/services/seo.service';
import { SchemaInjectionService } from '../../core/services/schema-injection.service';
import { SafetyHomeComponent } from './components/safety-home/safety-home.component';
import { WhyAskComponent } from './components/why-ask/why-ask.component';
import { Meta } from '@angular/platform-browser';
import { VerfiedAgentComponent } from './components/verfied-agent/verfied-agent.component';
import { HomeToursComponent } from './components/home-tours/home-tours.component';
import { HomeBlogComponent } from "./components/home-blog/home-blog.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        TranslateModule,
        HeroSectionComponent,
        TopDestinationComponent,
        BookHomeComponent,
        SafetyHomeComponent,
        WhyAskComponent,
        VerfiedAgentComponent,
        HomeToursComponent,
        HomeBlogComponent
    ],
    providers: [HomeService]
})
export class HomeComponent implements OnInit, OnDestroy {
  description: any;
  comeData: boolean = false;
  private timeoutId: any;
  private maxChecks = 5; // Limit the number of checks
  private currentChecks = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute,
    private _Home: HomeService,
    private seo: SeoService,
    private schema: SchemaInjectionService,
    private meta: Meta,
    private applicationRef: ApplicationRef,
  ) {
    this.initializeSeoData();
    this.meta.addTags([
      { name: 'description', content: 'Your page description' },
      { name: 'keywords', content: 'Angular, SSR, SEO' },
      { property: 'og:title', content: 'Your Page Title' },
      { property: 'og:description', content: 'Your page description' },
      { property: 'og:type', content: 'website' },
      // Add more meta tags as needed
    ]);
  }

  ngOnInit(): void {
    this.subscription.add(this._Home.getAboutAs().subscribe(result => {
      this.description = result.data;
      this.comeData = true;
    }));
  }

  private initializeSeoData(): void {
    const seoData = this.route.snapshot.data['seoData']?.data[0];
    if (seoData) {
      this.seo.data.title = seoData.title;
      this.seo.data.description = seoData.description;
      this.seo.data.robots = seoData.robots;
      this.seo.data.keywords = seoData.keywords;
      this.seo.data.fbDes = seoData.facebook_description;
      this.seo.data.fbImg = seoData.facebook_image;
      this.seo.data.fbTit = seoData.og_title;
      this.seo.data.twitterDes = seoData.twitter_description;
      this.seo.data.twitterImage = seoData.twitter_image;
      this.seo.data.twitterTit = seoData.twitter_title;
      this.seo.updateTags(this.seo.data);
      if (seoData.seo_schema) {
        this.schema.injectSchema(seoData.seo_schema);
      }
    } else {
      console.warn('SEO data is not available');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
