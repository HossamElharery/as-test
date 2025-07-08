
import { Component, Input, OnInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper';

// Install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Autoplay]);

@Component({
    imports: [CarouselModule, TranslateModule, SwiperModule],
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    encapsulation: ViewEncapsulation.None,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryComponent implements OnInit {
  config = {
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  };

  thumbsSwiper: any;
  @Input() gallery: any[] = [];
  @Input() cruise = false;
  @Input() page = false;
  @Input() hotel = false;
  @Input() excur = false;

  constructor() {}

  ngOnInit(): void {}
}
