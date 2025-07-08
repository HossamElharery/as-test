import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
 import { SafeHtmlComponent } from "../../../shared/components/safe-html/safe-html.component";

@Component({
    selector: 'app-hotels-cities',
    imports: [
        CommonModule,
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,
        SafeHtmlComponent
    ],
    templateUrl: './hotels-cities.component.html',
    styleUrls: ['./hotels-cities.component.css']
})
export class HotelsCitiesComponent implements OnInit ,OnDestroy{

  packagesNames: destination[] = [];
  packageContent: destination[] = [];
  id: any;
  loading:boolean=true
  banner: any;
  banner_alt: any;
  data: any[]=[]
  public isBrowser: boolean;
  subscription:Subscription = new Subscription()

  constructor(private _destinationPack: HomeserviceService ,
      private seo:SeoService,
       private router: Router,
       private schema : SchemaInjectionService,
       private route: ActivatedRoute,
       @Inject(PLATFORM_ID) private platformId: Object
       ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {

    if (this.route.parent) {
      this.subscription.add(this.route.parent.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('slug');



        this.subscription.add(this._destinationPack.getSeoCategory(this.id, 'hotels').subscribe({
          next: (res) => {

            this.getSeo(res);

            this.data = res.data;


          },
        }));

        this.subscription.add( this._destinationPack.getHotelsCities(this.id).subscribe((res) => {
          this.packageContent = res.data.cities;

           this.loading=false

        }))



      }));
    } else {
      console.error('Parent route is not available.');
    }




  }

  getSeo(result: any) {
    //seo
    this.seo.data.title = result.data[0]?.seo.title;
    this.seo.data.description = result.data[0]?.seo.description;
    this.seo.data.robots = result.data[0]?.seo.robots;
    this.seo.data.keywords = result.data[0]?.seo.keywords;
    this.seo.data.fbDes = result.data[0]?.seo.facebook_description;
    this.seo.data.fbImg = result.data[0]?.seo.facebook_image;
    this.seo.data.fbTit = result.data[0]?.seo.facebook_title;
    this.seo.data.twitterDes = result.data[0]?.seo.twitter_description;
    this.seo.data.twitterImage = result.data[0]?.seo.twitter_image;
    this.seo.data.twitterTit = result.data[0]?.seo.twitter_title;
    this.seo.updateTags(this.seo.data);
    if (result.data[0].seo.schema) {
      this.schema.injectSchema(result.data[0].seo.schema)
    }
    // end seo
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSafeContent(content: any): string {
    if (!content) return '';
    return typeof content === 'string' ? content : String(content);
  }

  getSafeBackgroundImage(imageUrl: any): any {
    if (!imageUrl || !this.isBrowser) {
      return {'background-image': 'linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0 ,0 ,0, .5)) , url(../../../../../../assets/imgs/default-banner.webp)'};
    }
    return {'background-image': `linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0 ,0 ,0, .5)) , url(${imageUrl})`};
  }

  getSafeCardBackground(imageUrl: any): any {
    if (!imageUrl || !this.isBrowser) {
      return {'background-image': 'linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0 ,0 ,0, .5))'};
    }
    return {'background-image': `linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0 ,0 ,0, .5)) , url(${imageUrl})`};
  }
}
