import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Guide } from '../../../core/interfaces/guide';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';

import { FormsModule } from '@angular/forms';
import { NgbRatingModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { innerHtmlPipe } from '../../../shared/pipes/innerHtml/innerHtml.pipe';
import { ScrollButtonComponent } from "../../../shared/components/scroll-button/scroll-button.component";
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { RelatedCardRibbonComponent } from "../../../shared/components/related-card-ribbon/related-card-ribbon.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html/safe-html.pipe";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-single-guide',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        ScrollButtonComponent,
        ExpertReviewsComponent,
        RelatedCardRibbonComponent,
        SafeHtmlPipe, CommonModule
    ],
    templateUrl: './single-guide.component.html',
    styleUrls: ['./single-guide.component.css']
})
export class SingleGuideComponent implements OnInit, OnDestroy {
  singleGuide: Guide[] = [];
  idGuid: any;
  id: any;
  desSlug = '';
  desName: any;
  GuideName: any;
  allpage: any;
  loading: boolean = true;

  subscription:Subscription = new Subscription()

  constructor(
    public _homeService: HomeserviceService,
    private _active: ActivatedRoute,
    private seo: SeoService,
    private router: Router,
    private schema:SchemaInjectionService

  ) {}

  ngOnInit(): void {
    // Get Id From Loacal Storage
   this.subscription.add( this._active.paramMap.subscribe((params: ParamMap) => {
      this.loading = true;

      this.id = params.get('id');
      this.idGuid = params.get('guide');
      this.subscription.add(this._homeService.getSingleGuide(this.id, this.idGuid).subscribe({
        next: (result) => {

          //seo
          this.seo.data.title = result.data[0].seo.title;
          this.seo.data.description = result.data[0].seo.description;
          this.seo.data.robots = result.data[0].seo.robots;
          this.seo.data.keywords = result.data[0].seo.keywords;
          this.seo.data.fbDes = result.data[0].seo.facebook_description;
          this.seo.data.fbImg = result.data[0].seo.facebook_image;
          this.seo.data.fbTit = result.data[0].seo.facebook_title;
          this.seo.data.twitterDes = result.data[0].seo.twitter_description;
          this.seo.data.twitterImage = result.data[0].seo.twitter_image;
          this.seo.data.twitterTit = result.data[0].seo.twitter_title;
          this.seo.updateTags(this.seo.data);
          if (result.data[0].seo.schema) {
            this.schema.injectSchema(result.data[0].seo.schema)
          }



          this.singleGuide = result.data;
          //  delete
          this.GuideName = result.data[0].category.name
          this._homeService.getDestinationGuides(this.id).subscribe((res) => {
            this.desSlug = res.data.destination[0].slug;

            this.desName = res.data.destination[0].name;
            this.loading = false;

            let idName = res.data.destination[0].id;

            this._homeService
              .getOneDestinationDetails(idName)
              .subscribe((res) => {
                // this.GuideName = res.data[0].categories[0].name;
              });
          });
        },
        error: (e) => {
          this.router.navigate(['/404']);
        },
        // complete: () => {    },
      }));
    }));
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 5000,
    pullDrag: true,
    margin: 8,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
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

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 5000,
    pullDrag: true,
    margin: 8,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
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
    this.subscription.unsubscribe();
    }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
