import { Component,OnInit } from '@angular/core';
import { HomeserviceService } from '../../services/homeservice.service';
import { SeoService } from '../../services/seo.service';
import { SchemaInjectionService } from '../../services/schema-injection.service';

 import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-meet-the-team',
    imports: [
        TranslateModule
    ],
    templateUrl: './meet-the-team.component.html',
    styleUrls: ['./meet-the-team.component.css']
})
export class MeetTheTeamComponent implements OnInit {

  constructor(private _page:HomeserviceService , private seo:SeoService , private schema:SchemaInjectionService) { }

  ngOnInit(): void {
    // Add timeout protection for SSR
    const timeoutId = setTimeout(() => {
      console.warn('Meet-the-team component initialization timeout, proceeding with fallback data');
      this.setFallbackData();
    }, 8000);

    this._page.getSinglePageGeneral(`meet-the-team`).subscribe({
      next: (res) => {
        clearTimeout(timeoutId);
        try {
          this.seo.data.title = res.page?.[0]?.seo?.title || 'Meet The Team - Ask Aladdin'
          this.seo.data.description = res.page?.[0]?.seo?.description || 'Meet our travel experts and development team'
          this.seo.data.robots = res.page?.[0]?.seo?.robots || 'index,follow'
          this.seo.data.keywords = res.page?.[0]?.seo?.keywords || 'team, staff, ask aladdin, travel experts'
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
        } catch (error) {
          console.error('Error processing meet-the-team data:', error);
          this.setFallbackData();
        }
      },
      error: (error) => {
        clearTimeout(timeoutId);
        console.error('Error loading meet-the-team page:', error);
        this.setFallbackData();
      }
    })
  }

  private setFallbackData(): void {
    // Set fallback SEO data
    this.seo.data.title = 'Meet The Team - Ask Aladdin'
    this.seo.data.description = 'Meet our travel experts and development team at Ask Aladdin'
    this.seo.data.robots = 'index,follow'
    this.seo.data.keywords = 'team, staff, ask aladdin, travel experts, development team'
    this.seo.updateTags(this.seo.data)
    }
  }


