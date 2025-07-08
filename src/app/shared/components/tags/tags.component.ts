
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    imports: [CarouselModule, TranslateModule],
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
@Input() cruise = false
@ViewChild("myElem") MyProp: ElementRef | undefined;

  constructor() {
    this.MyProp?.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  ngOnInit(): void {
  }
  IItineraryTag2:boolean = false
  includeTag2:boolean = false
  highlightsTag2:boolean = false
  priceTag2:boolean = false
  travTag2:boolean = false
  OptionalTag2:boolean = false
  videosTag2:boolean = false
  accomodationTag2:boolean = false
  reviewsTag2:boolean = false
  // @HostListener("window:scroll", [])
  // onWindowScroll() {

  //   const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   let Itinerary = document.getElementById('IItineraryTag')
  //   let highlightsTag = document.getElementById('highlightsTag')
  //   let IncludedTag = document.getElementById('IncludedTag')


  //   if (number >= 780) {
  //     this.IItineraryTag2 = true
  //     this.highlightsTag2 = false
  //   }else{
  //     this.IItineraryTag2 = false
  //   }
  //   if(number >= 2888){
  //     this.highlightsTag2 = true
  //     this.IItineraryTag2 = false
  //   }else{
  //     this.highlightsTag2 = false
  //   }
  //   if (number >= 3562) {
  //     this.highlightsTag2 = false
  //     this.includeTag2 = true
  //   }else{
  //     this.includeTag2 = false
  //   }if (number >= 4317) {
  //     this.priceTag2 = true
  //     this.includeTag2 = false
  //   }else{
  //     this.priceTag2 = false
  //   }if (number >= 4936) {
  //     this.travTag2 = true
  //     this.priceTag2 = false
  //   }else{
  //     this.travTag2 = false
  //   }if (number >= 5307) {
  //     this.OptionalTag2 = true
  //     this.travTag2 = false
  //   }else{
  //     this.OptionalTag2 = false
  //   }if (number >= 5677) {
  //     this.videosTag2 = true
  //     this.OptionalTag2 = false
  //   }else{
  //     this.videosTag2 = false
  //   }if (number >= 6225) {
  //     this.accomodationTag2 = true
  //     this.videosTag2 = false
  //   }else{
  //     this.accomodationTag2 = false
  //   }if (number >= 7601) {
  //     this.reviewsTag2 = true
  //     this.accomodationTag2 = false
  //   }else{
  //     this.reviewsTag2 = false
  //   }

  // }
  Itinerary(){
    document.getElementById('Itinerary')?.scrollIntoView({behavior:'smooth'})

  }
  Included(){
    document.getElementById('included')?.scrollIntoView({behavior:'smooth'})
  }
  prices(){
    document.getElementById('prices')?.scrollIntoView({behavior:'smooth'})
  }
  trav(){
    document.getElementById('trav')?.scrollIntoView({behavior:'smooth'})
  }

  accomodation(){
    document.getElementById('accomodation')?.scrollIntoView({behavior:'smooth'})
  }
  highlights(){
    document.getElementById('highlights')?.scrollIntoView({behavior:'smooth'})
  }
  location(){
    document.getElementById('map')?.scrollIntoView({behavior:'smooth'})
  }
  videos(){
    document.getElementById('videos')?.scrollIntoView({behavior:'smooth'})
    if(this.cruise == true ){
      document.getElementById('Gallery')?.scrollIntoView({behavior:'smooth'})
    }
  }
  Optional(){
    document.getElementById('optional')?.scrollIntoView({behavior:'smooth'})

  }
  reviews(){
    document.getElementById('reviews')?.scrollIntoView({behavior:'smooth'})
  }
}
