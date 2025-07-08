
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    imports: [CarouselModule, TranslateModule, CommonModule],
    selector: 'app-price-data',
    templateUrl: './price-data.component.html',
    styleUrls: ['./price-data.component.scss']
})
export class PriceDataComponent implements OnInit ,AfterViewInit{
@Input() excur = false
@Input() package = false
@Input() prices:any

  id: any;
  standred_1=[];
  date=new Date();
  excurtion: any;
  constructor() {



  }


  ngOnInit(): void {



    // let arrowBounce = function() {
    //   let arrow = $(".arrow");

    //   if (arrow.hasClass("lift")) {
    //     arrow.removeClass("lift");
    //   } else {
    //     arrow.addClass("lift");
    //   }
    // };

    // // run the arrowBounce function every 800ms
    // setInterval(arrowBounce, 800);




  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }


  // open(){
  //   $("#accordion").on("hide.bs.collapse show.bs.collapse", (e: { target: any; }) => {
  //     $(e.target)
  //       .prev()
  //       .find("i:last-child")
  //       .toggleClass("fa-minus fa-plus");
  //   });

  // }



}
