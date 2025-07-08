import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { destination } from '../../../../core/interfaces/destination';
import { HomeserviceService } from '../../../../core/services/homeservice.service';

import { TranslateModule } from '@ngx-translate/core';
import { SecondFooterComponent } from "../../../../shared/components/second-footer/second-footer.component";

@Component({
    selector: 'app-hot-related',
    imports: [RouterLink, CarouselModule, TranslateModule, SecondFooterComponent],
    templateUrl: './hot-related.component.html',
    styleUrl: './hot-related.component.scss'
})
export class HotRelatedComponent implements OnInit, OnDestroy {
  private unSub!: Subscription;
  id: any;
  singleDestination: destination[] = [];
  dataTrue: boolean = false;
  singleDestinationContent: destination[] = [];
  packageOffer: destination[] = [];
  excursionsOffer: destination[] = [];
  cruisesOffer: destination[] = [];
  relatedPages: destination[] = [];

  image = '../../../../../assets/imgs/Egypt-Shopping-Guide.jpg';
   desSlug: any;
  constructor(
    private _Home: HomeserviceService,
    private _active: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('slug')

      this.unSub = this._Home.getOneDistination(this.id).subscribe((res) => {
        this.singleDestination = res.data;
        this.relatedPages = res.data[0].related_pages;

        if (this.relatedPages.length == 0) {
          this.dataTrue = true;
        } else {

          this.dataTrue = false;
        }
        this.desSlug = res.data[0].slug;

      });



      this._Home.getHotOffer(this.id).subscribe((result) => {
        this.cruisesOffer = result.data[0].cruises;
        this.packageOffer = result.data[0].packages;
        this.excursionsOffer = result.data[0].excursions;
      });


    })



  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 5000,
    pullDrag: true,
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
        items: 5,
      },
    },
    nav: false,
  };
  customOwl: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay: false,
    autoplayTimeout: 5000,
    pullDrag: true,
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
        items: 5,
      },
    },
    nav: false,
  };

  trackBy(index:number, el:any) {
    return el.id;
   }

   ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
