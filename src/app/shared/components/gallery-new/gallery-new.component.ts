
import { Component, Input, OnInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper';

// Install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Autoplay]);

@Component({
    selector: 'app-gallery-new',
    imports: [SwiperModule],
    templateUrl: './gallery-new.component.html',
    styleUrls: ['./gallery-new.component.css'],
    encapsulation: ViewEncapsulation.None,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryNewComponent implements OnInit {
  config = {
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
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
