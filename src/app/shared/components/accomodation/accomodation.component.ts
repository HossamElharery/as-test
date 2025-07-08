import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Hotel } from '../../../core/interfaces/hotel';

import { TranslateModule } from '@ngx-translate/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-accomodation',
    imports: [RouterLink, CarouselModule, TranslateModule, NgbRatingModule, FormsModule],
    templateUrl: './accomodation.component.html',
    styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {
  @Input() cruise = false;
  @Input() package = false;
  @Input() accomodation:any
  @Input() flag1: any;
  @Input() flag2: any;
  @Input() flag3: any
  @Input() flag4: any
  @Input() desName: any;
  @Input() desSlug: any;
  @Input() slug: any;
  @Input()destination:any
  @Input() cruises: Hotel[] = [];
  @Input() pushDes:any
  idCruise: any;

  constructor(private _active: ActivatedRoute) { }

  id: any;
  idhotel: any;

  max = 5;
  isReadonly = true;
  overStar: number | undefined;
  percent: number | undefined;

  ngOnInit(): void {

    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id')
      this.idhotel=params.get('hotel')})





  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    margin: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    pullDrag: true,
    dots: true,

    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }

    },
    nav: false

  }


}
