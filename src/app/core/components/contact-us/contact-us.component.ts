import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HomeserviceService } from '../../services/homeservice.service';
import { SeoService } from '../../services/seo.service';
import { SchemaInjectionService } from '../../services/schema-injection.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';

@Component({
    selector: 'app-contact-us',
    imports: [
        CommonModule,
        TranslateModule,
        AskExpertBtnComponent,
    ],
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  socialsContainer: any;
  phone1: any;
  mail: any;
  phone2: any;
  address2: any;
  address1: any;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(public contactsUs:HomeserviceService, private seo:SeoService, private schema:SchemaInjectionService) { }

  ngOnInit(): void {
    // Add timeout protection for SSR
    const timeoutId = setTimeout(() => {
      console.warn('Contact-us component initialization timeout, proceeding with fallback data');
    }, 8000);

    this.contactsUs.getSinglePageGeneral(`contact-us`).subscribe({
      next: (res) => {
        clearTimeout(timeoutId);
        this.seo.data.title = res.page[0]?.seo?.title || 'Contact Us'
        this.seo.data.description = res.page[0]?.seo?.description || 'Contact Ask Aladdin'
        this.seo.data.robots = res.page[0]?.seo?.robots || 'index,follow'
        this.seo.data.keywords = res.page[0]?.seo?.keywords || 'contact, travel, egypt'
        this.seo.data.fbDes = res.page[0]?.seo?.facebook_description || ''
        this.seo.data.fbImg = res.page[0]?.seo?.facebook_image || ''
        this.seo.data.fbTit = res.page[0]?.seo?.facebook_title || ''
        this.seo.data.twitterDes = res.page[0]?.seo?.twitter_description || ''
        this.seo.data.twitterImage = res.page[0]?.seo?.twitter_image || ''
        this.seo.data.twitterTit = res.page[0]?.seo?.twitter_title || ''
        this.seo.updateTags(this.seo.data)
        if (res.page[0]?.seo?.schema) {
          this.schema.injectSchema(res.page[0].seo.schema)
        }

        // Only get socials if we're in browser mode to prevent SSR hanging
        if (this.isBrowser) {
          this.contactsUs.getSocials().subscribe({
            next: (result) => {
              this.socialsContainer = result.data || []
              this.mail = result.data?.[0]?.mail || ''
              this.phone1 = result.data?.[0]?.phone1 || ''
              this.address2 = result.data?.[0]?.address2 || ''
              this.address1 = result.data?.[0]?.address1 || ''
              this.phone2 = result.data?.[0]?.phone2 || ''
            },
            error: (error) => {
              console.error('Error loading socials:', error);
              // Set fallback data
              this.socialsContainer = [];
              this.mail = '';
              this.phone1 = '';
              this.address2 = '';
              this.address1 = '';
              this.phone2 = '';
            }
          });
        }
      },
      error: (error) => {
        clearTimeout(timeoutId);
        console.error('Error loading contact-us page:', error);
        // Set fallback SEO data
        this.seo.data.title = 'Contact Us - Ask Aladdin'
        this.seo.data.description = 'Contact Ask Aladdin for travel inquiries and support'
        this.seo.data.robots = 'index,follow'
        this.seo.data.keywords = 'contact, travel, egypt, ask aladdin'
        this.seo.updateTags(this.seo.data)
      }
    })
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
