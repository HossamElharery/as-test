import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

import { MultiContentDirective } from '../../directive/multi-content/multi-content.directive';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from "swiper";
import { CommonModule } from '@angular/common';

SwiperCore.use([Pagination, Navigation]);

@Component({
    selector: 'app-swiper-section',
    imports: [
        SwiperModule,
        CommonModule
    ],
    templateUrl: './swiper-section.component.html',
    styleUrls: ['./swiper-section.component.scss']
})
export class SwiperSectionComponent {

  @ContentChild(MultiContentDirective) content!: MultiContentDirective;
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  @Input() swiperConfig: SwiperOptions = {};
  @Input() data: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

}
