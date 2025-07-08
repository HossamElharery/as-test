import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { AskExpertBtnComponent } from '../../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { BreadcumbsComponent } from '../../../../shared/components/breadcumbs/breadcumbs.component';
import { Subscription } from 'rxjs';
import { destination } from '../../../../core/interfaces/destination';
import { DestinationsService } from '../../services/destinations.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { ShimmerComponent } from '../../../../shared/components/shimmer/shimmer.component';
import { innerHtmlPipe } from '../../../../shared/pipes/innerHtml/innerHtml.pipe';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-all-destination',
    imports: [
        BannerComponent,
        BreadcumbsComponent,
        ShimmerComponent,
        innerHtmlPipe,
        RouterLink,
        TranslateModule
    ],
    templateUrl: './all-destination.component.html',
    styleUrl: './all-destination.component.scss'
})
export class AllDestinationComponent implements OnDestroy, OnInit {
  private subscription: Subscription = new Subscription();

  loading: boolean = true
  destinationContainer: destination[] = []
  description: any;

  constructor(private _destination: DestinationsService, private seo: SeoService, private schema: SchemaInjectionService) { }

  ngOnInit(): void {
    this.getDestinationPageSeo();
    this.getAllDestination();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();


  }

  getAllDestination() {
    this.subscription.add(this._destination.getAlldestination().subscribe(result => {
      this.destinationContainer = result.data
      this.loading = false
    }))
  }


  getDestinationPageSeo() {
    this._destination.getSinglePageGeneral(`all-destinations`).subscribe(res => {
      this.seo.data.title = res.page[0].seo.title
      this.seo.data.description = res.page[0].seo.description
      this.seo.data.robots = res.page[0].seo.robots
      this.seo.data.keywords = res.page[0].seo.keywords
      this.seo.data.fbDes = res.page[0].seo.facebook_description
      this.seo.data.fbImg = res.page[0].seo.facebook_image
      this.seo.data.fbTit = res.page[0].seo.facebook_title
      this.seo.data.twitterDes = res.page[0].seo.twitter_description
      this.seo.data.twitterImage = res.page[0].seo.twitter_image
      this.seo.data.twitterTit = res.page[0].seo.twitter_title
      this.seo.updateTags(this.seo.data)
      if (res.page[0].seo.schema) {
        this.schema.injectSchema(res.page[0].seo.schema)
      }
      this.description = res.page[0].description
    })
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  trackBy(index: number, el: any) {
    return el.id;
  }
}
