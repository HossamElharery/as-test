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

  ) {
    this.initializeSeoData();

  }

  ngOnInit(): void {
    this.subscription.add(this._Home.getAboutAs().subscribe(result => {
      this.description = result.data;
      this.comeData = true;
    }));
  }

  private initializeSeoData(): void {
    // Get SEO data from resolver (already fetched during SSR)
    const seoData = this.route.snapshot.data['seoData']?.data[0];

    if (seoData) {
      // Use the complete meta tags method that properly handles all fields
      this.seo.updateCompleteMetaTags(seoData);

      // Inject schema if available
      if (seoData.seo_schema) {
        this.schema.injectSchema(seoData.seo_schema);
      }
    } else {
      console.warn('SEO data is not available in route resolver');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
