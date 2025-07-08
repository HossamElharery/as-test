import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';

import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
 import { NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from '../../../shared/components/safe-html/safe-html.component';

@Component({
    selector: 'app-city-excursion',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        NgStyle,
        SlicePipe,
        SafeHtmlComponent
    ],
    templateUrl: './city-excursion.component.html',
    styleUrls: ['./city-excursion.component.css']
})

export class CityExcursionComponent implements OnInit, OnDestroy {
  phone: any;
  id: any
  citys: any
  singleDestination: destination[] = []
  desSlug: any;
  desName: any;
  des: any;
  loading: boolean = true
  subscription: Subscription = new Subscription()
  public isBrowser: boolean;

  constructor(
    private _excursions: HomeserviceService,
    private seo: SeoService,
    private _Active: ActivatedRoute,
    private schema: SchemaInjectionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.subscription.add(this._Active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('slug')
      this._excursions.getSeoCategory(this.id, "travel-excursions").subscribe({
        next: res => {
          this.getSeo(res)
          this.singleDestination = res.data
        }
      })
      this._excursions.ExcursionCity(this.id).subscribe(result => {
        this.citys = result.data.cities;
        this.desSlug = result.data.cities[0].destination.slug
        this.desName = result.data.cities[0].destination.name
        this.loading = false
      })
    }))
  }

  getSeo(result: any) {
    //seo
    this.seo.data.title = result.data[0].seo.title
    this.seo.data.description = result.data[0].seo.description
    this.seo.data.robots = result.data[0].seo.robots
    this.seo.data.keywords = result.data[0].seo.keywords
    this.seo.data.fbDes = result.data[0].seo.facebook_description
    this.seo.data.fbImg = result.data[0].seo.facebook_image
    this.seo.data.fbTit = result.data[0].seo.facebook_title
    this.seo.data.twitterDes = result.data[0].seo.twitter_description
    this.seo.data.twitterImage = result.data[0].seo.twitter_image
    this.seo.data.twitterTit = result.data[0].seo.twitter_title
    this.seo.updateTags(this.seo.data)
    if (result.data[0].seo.schema) {
      this.schema.injectSchema(result.data[0].seo.schema)
    }
    // end seo
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getSafeContent(content: any): string {
    if (!content) return '';
    return typeof content === 'string' ? content : String(content);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
