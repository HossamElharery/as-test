import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Faqs } from '../../../core/interfaces/faqs';
import { HomeserviceService } from '../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../core/services/schema-injection.service';
import { SeoService } from '../../../core/services/seo.service';

import { TranslateModule } from '@ngx-translate/core';
import { AskExpertBtnComponent } from '../../../shared/components/ask-expert-btn/ask-expert-btn.component';
import { ExpertReviewsComponent } from "../../../shared/components/side-bar/expert-reviews/expert-reviews.component";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgStyle, SlicePipe, isPlatformBrowser } from '@angular/common';
import { SafeHtmlComponent } from "../../../shared/components/safe-html/safe-html.component";

@Component({
    selector: 'app-faqs',
    imports: [
        RouterLink,
        TranslateModule,
        AskExpertBtnComponent,

        ExpertReviewsComponent,
        NgbAccordionModule, NgStyle, NgClass,
        SafeHtmlComponent
    ],
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  openPanels: { [key: string]: boolean } = {};

  // Toggle panel open/closed
  togglePanel(categoryIndex: number, panelIndex: number): void {
    const panelId = `${categoryIndex}-${panelIndex}`;
    this.openPanels[panelId] = !this.isPanelOpen(categoryIndex, panelIndex);
  }

  // Check if a panel is open
  isPanelOpen(categoryIndex: number, panelIndex: number): boolean {
    const panelId = `${categoryIndex}-${panelIndex}`;
    return this.openPanels[panelId] === true;
  }

  loading:boolean=true
  faqsContainer: Faqs[] = [];
  faqs_name: any;
  blogBanner: string = `../../../assets/imgs/5b14a68e3de5a.jpg`;
  faqsDes: string = "";
  open: boolean = false;
  plus = `plus`
  minus = `minus`
  faName: any;
  category: string = "";
  Title!: String;
  id: any;
  allFaqs: Faqs[] = [];
  destination_banner: any;
  noData: boolean = false;
  private isBrowser!: boolean;

  constructor(
    private _faqs: HomeserviceService,
    private _Active: ActivatedRoute,
    private seo: SeoService,
    private schema: SchemaInjectionService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  // Helper method to safely get content for HTML rendering
  getSafeContent(content: any): string {
    if (!content) {
      return '';
    }
    return String(content).trim();
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this._Active.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('slug')

      this._faqs.getSeoCategory(this.id , "myths-facts").subscribe({
        next: res => {
          this.getSeo(res)

          this.allFaqs = res.data
          this.blogBanner = res.data[0].banner
          this.faName = res.data[0].name
        }
      })

      this._faqs.getDestinationFact(this.id).subscribe((result) => {
        this.faqsContainer = result.data.faqs;



        if (this.faqsContainer?.length > 0) {



          this.destination_banner = result.data?.destination[0].banner;
          this.loading=false

          this.faqs_name = result.data.destination[0].name;
          this.faqsDes = result.data.destination[0].description = "no data";

        }
        else {
          this.noData = true

        }





      })
    })
    }
  // setId(id: any) {
  //     localStorage.setItem("idFaq", id);
  //   }
    getSeo(result:any){
      //seo
      this.seo.data.title = result.data[0].seo.title
      this.seo.data.description =  result.data[0].seo.description
      this.seo.data.robots =  result.data[0].seo.robots
      this.seo.data.keywords =  result.data[0].seo.keywords
      this.seo.data.fbDes =  result.data[0].seo.facebook_description
      this.seo.data.fbImg =  result.data[0].seo.facebook_image
      this.seo.data.fbTit =  result.data[0].seo.facebook_title
      this.seo.data.twitterDes =  result.data[0].seo.twitter_description
      this.seo.data.twitterImage =  result.data[0].seo.twitter_image
      if (result.data[0].seo.schema) {
        this.schema.injectSchema(result.data[0].seo.schema)
      }
      this.seo.updateTags(this.seo.data)

    }
  openPlus(i: any){
      i=!this.open
    this.open = !this.open
    }
    numSequence(n: number): Array<number> {
      return Array(n);
    }
}
