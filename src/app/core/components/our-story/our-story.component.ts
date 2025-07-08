import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Pages } from '../../interfaces/pages';
import { HomeserviceService } from '../../services/homeservice.service';
import { SeoService } from '../../services/seo.service';
import { SchemaInjectionService } from '../../services/schema-injection.service';

import { TranslateModule } from '@ngx-translate/core';
// import { SafeHtmlPipe } from 'ngx-spinner/lib/safe-html.pipe';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { RelatedCardRibbonComponent } from '../../../shared/components/related-card-ribbon/related-card-ribbon.component';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { ExpertReviewsComponent } from '../../../shared/components/side-bar/expert-reviews/expert-reviews.component';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-our-story',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        ExpertReviewsComponent,
        SafeHtmlComponent,
        RelatedCardRibbonComponent,
        ScrollButtonComponent,
        CommonModule
    ],
    templateUrl: './our-story.component.html',
    styleUrls: ['./our-story.component.css']
})
export class OurStoryComponent implements OnInit {
  singlePageContent:Pages[]=[];
  slug: any;

  loading: boolean = true
  script: any = '';

  relatedPages: Pages[] = [];

  related_blogs: Pages[] = [];
  related_packages: Pages[] = [];
  related_excursions: Pages[] = [];
  related_cruises: Pages[] = [];
  related_travel_guides: Pages[] = [];

  related_categories: Pages[] = [];
  accordion: any[] = [];
  id: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private _page : HomeserviceService ,private schema:SchemaInjectionService,  private _Active:ActivatedRoute , private seo:SeoService) { }

  ngOnInit(): void {
    // Add timeout protection for SSR
    const timeoutId = setTimeout(() => {
      console.warn('Our-story component initialization timeout, proceeding with fallback data');
      this.loading = false;
    }, 8000);

    this._Active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('slug')
      this._page.getSinglePageGeneral(`our-story`).subscribe({
        next: (res) => {
          clearTimeout(timeoutId);
          try {
            this.seo.data.title = res.page?.[0]?.seo?.title || 'Our Story'
            this.seo.data.description = res.page?.[0]?.seo?.description || 'Learn about Ask Aladdin story'
            this.seo.data.robots = res.page?.[0]?.seo?.robots || 'index,follow'
            this.seo.data.keywords = res.page?.[0]?.seo?.keywords || 'our story, about us, ask aladdin'
            this.seo.data.fbDes = res.page?.[0]?.seo?.facebook_description || ''
            this.seo.data.fbImg = res.page?.[0]?.seo?.facebook_image || ''
            this.seo.data.fbTit = res.page?.[0]?.seo?.facebook_title || ''
            this.seo.data.twitterDes = res.page?.[0]?.seo?.twitter_description || ''
            this.seo.data.twitterImage = res.page?.[0]?.seo?.twitter_image || ''
            this.seo.data.twitterTit = res.page?.[0]?.seo?.twitter_title || ''
            this.seo.updateTags(this.seo.data)
            if (res.page?.[0]?.seo?.schema) {
              this.schema.injectSchema(res.page[0].seo.schema)
            }

            this.singlePageContent = res.page || []
            this.script = res.page?.[0]?.form || '';
            this.relatedPages = res.page?.[0]?.related_pages || [];
            this.related_blogs = res.page?.[0]?.related_blogs || [];
            this.related_packages = res.page?.[0]?.related_packages || [];
            this.related_cruises = res.page?.[0]?.related_cruises || [];
            this.related_excursions = res.page?.[0]?.related_excursions || [];
            this.related_travel_guides = res.page?.[0]?.related_travel_guides || [];
            this.related_categories = res.page?.[0]?.related_categories || [];
            this.accordion = res.page?.[0]?.accordion || []
            this.loading = false
          } catch (error) {
            console.error('Error processing our-story data:', error);
            this.setFallbackData();
          }
        },
        error: (error) => {
          clearTimeout(timeoutId);
          console.error('Error loading our-story page:', error);
          this.setFallbackData();
        }
      })
    })
  }

  private setFallbackData(): void {
    // Set fallback SEO data
    this.seo.data.title = 'Our Story - Ask Aladdin'
    this.seo.data.description = 'Learn about Ask Aladdin travel company story and mission'
    this.seo.data.robots = 'index,follow'
    this.seo.data.keywords = 'our story, about us, ask aladdin, travel company'
    this.seo.updateTags(this.seo.data)

    // Set fallback component data
    this.singlePageContent = [];
    this.script = '';
    this.relatedPages = [];
    this.related_blogs = [];
    this.related_packages = [];
    this.related_cruises = [];
    this.related_excursions = [];
    this.related_travel_guides = [];
    this.related_categories = [];
    this.accordion = [];
    this.loading = false;
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
}
