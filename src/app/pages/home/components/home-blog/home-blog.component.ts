import { Component, PLATFORM_ID, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { destinationBlog } from '../../../../core/interfaces/destinationBlog';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SwiperSectionComponent } from '../../../../shared/components/swiper-section/swiper-section.component';
import { SwiperOptions } from 'swiper';
import { innerHtmlPipe } from '../../../../shared/pipes/innerHtml/innerHtml.pipe';
import { NgClass, NgStyle, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MultiContentDirective } from '../../../../shared/directive/multi-content/multi-content.directive';
import { HomeService } from '../../services/home.service';
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';

@Component({
    selector: 'app-home-blog',
    imports: [
        SwiperSectionComponent,
        NgStyle,
        RouterLink,
        TranslateModule,
        MultiContentDirective,
        SafeHtmlComponent
    ],
    templateUrl: './home-blog.component.html',
    styleUrl: './home-blog.component.scss'
})
export class HomeBlogComponent {
  private unSub!: Subscription
  blogContainer: destinationBlog[] = []

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // category: string = '';
  swiperConfig: SwiperOptions = {
    direction: 'horizontal',
    spaceBetween: 25,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    lazy: true,
    navigation: false,
    pagination: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      470: {
        slidesPerView: 1,
      },
      767: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  };
  constructor(private _blog: HomeService) { }

  ngOnInit(): void {

    this.unSub = this._blog.getHomeBlog().subscribe(result => {
      this.blogContainer = result.blog.data



    })

  }

  getSafeContent(content: string, maxLength?: number): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    const stringContent = String(content);
    return maxLength ? stringContent.slice(0, maxLength) : stringContent;
  }

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: false,
  //   autoplay:true,
  //   autoplayTimeout:5000,
  //   pullDrag: false,
  //   margin:8,
  //   dots: false,
  //   navSpeed: 700,
  //   nav: false,
  //   navText: ['<', '>'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 3
  //     }
  //   },

  // }

  ngOnDestroy(): void {
    this.unSub.unsubscribe()


  }

  trackBy(index: number, el: any) {
    return el.id;
  }
}
