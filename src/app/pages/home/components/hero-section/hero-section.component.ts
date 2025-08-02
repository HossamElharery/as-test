import { Component, OnDestroy, OnInit } from '@angular/core';
import { sliders } from '../../../../core/interfaces/sliders';
import { smallSlider } from '../../../../core/interfaces/smallSlider';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgStyle, SlicePipe } from '@angular/common';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-hero-section',
    imports: [RouterLink, SlicePipe, NgStyle],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit , OnDestroy {
  loading:boolean=true
  subscription:Subscription = new Subscription()
//   @ViewChild('slickModal')
//   slickModal!: SlickCarouselComponent ;
//   slideConfig = {slidesToShow: 1,
//   slidesToScroll: 1 ,
//   autoplay: true,
//   autoplaySpeed: 5000,

// };

HomeConfig = {slidesToShow: 1,
  slidesToScroll: 1 ,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,

};
  // mobile: boolean=false;
  // next() {
  //   this.slickModal.slickNext();
  // }

  // prev() {
  //   this.slickModal.slickPrev();
  // }


  img="../../../../../assets/imgs/default.png"
  desSlug:any
  term: any;
  imgCondation = false
  image = [{
    img:``,
  }]
  videos = [{
    video:``,

  }]


  imageSlide:sliders[]=[]
  sliderContainer: sliders[] = [];


  smallSlider: smallSlider[]=[];
  constructor(private _slider: HomeService) {}
  ngOnInit(): void {
    this.loading=true
    this.subscription.add(this._slider.getSliders().subscribe((result: any) => {
      this.sliderContainer = result.data
      this.imageSlide = result.data
      this.smallSlider=result.data[0].slider_data
      this.imageSlide.forEach(ele => {
          this.videos.push({
            video:`${ele.ImageOrVideo}`,
          })
          this.loading=false
      })
    }))
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
