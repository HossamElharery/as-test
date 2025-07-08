
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { destination } from '../../../../core/interfaces/destination';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SchemaInjectionService } from '../../../../core/services/schema-injection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AskExpertBtnComponent } from "../../../../shared/components/ask-expert-btn/ask-expert-btn.component";
import { CommonModule } from '@angular/common';


@Component({
    imports: [RouterLink, CarouselModule, TranslateModule, AskExpertBtnComponent, CommonModule],
    selector: 'app-all-packages',
    templateUrl: './all-packages.component.html',
    styleUrls: ['./all-packages.component.css']
})
export class AllPackagesComponent implements OnInit {

  packagesNames: destination[] = [];
  packageContent: destination[] = [];
  id: any;
  loading:boolean=true

  constructor(private _destinationPack: HomeserviceService , private active:ActivatedRoute , private seo:SeoService , private schema:SchemaInjectionService) {}

  ngOnInit(): void {
    this.active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id')

    })
    this._destinationPack.getSinglePageGeneral(`all-travel-packages`).subscribe(res => {
      this.seo.data.title = res.page[0].seo.title
      this.seo.data.description =  res.page[0].seo.description
      this.seo.data.robots =  res.page[0].seo.robots
      this.seo.data.keywords = res.page[0].seo.keywords
      this.seo.data.fbDes =  res.page[0].seo.facebook_description
      this.seo.data.fbImg =  res.page[0].seo.facebook_image
      this.seo.data.fbTit =  res.page[0].seo.facebook_title
      this.seo.data.twitterDes =  res.page[0].seo.twitter_description
      this.seo.data.twitterImage =  res.page[0].seo.twitter_image
      this.seo.data.twitterTit =  res.page[0].seo.twitter_title
      this.seo.updateTags(this.seo.data)
      if (res.page[0].seo.schema) {
        this.schema.injectSchema(res.page[0].seo.schema)
      }
    })
    this._destinationPack
      .getAlldestination()
      .subscribe((result) => {
        this.packagesNames = result.data
      });

    this._destinationPack.getOneDestinationDetails(1).subscribe((res) => {
      this.packageContent = res.data[0].categories;

       this.loading=false

    });



  }


  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
