import { Component, Input, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sideBar } from '../../../../core/interfaces/sideBar';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    imports: [CarouselModule, TranslateModule],
    selector: 'app-expert-reviews',
    templateUrl: './expert-reviews.component.html',
    styleUrls: ['./expert-reviews.component.css']
})
export class ExpertReviewsComponent implements OnInit {
  des: any
  @Input('name') name ='blogs'

  constructor(private reviews:HomeserviceService ,private Location:Location,private router: Router, private route: ActivatedRoute ) { }

  side:sideBar[]=[]

  ngOnInit(): void {

    // this.des =  this.Location.path().split('/')[2]||'egypt'

    this.route.url.subscribe(segments => {
      if (segments.length === 3) {
          this.des = 'egypt';
          // console.log('egy');

      } else {
          this.des = segments[2]?.path || 'egypt';
      }
  });

    this.reviews.side(this.des,this.name).subscribe(result => {


      this.side = result.data;



    })


    // this.des = this.Location.path().split('/')[2] || 'egypt';

  // this.callApi().subscribe(
  //   result => {
  //     this.side = result.data;
  //   },
  //   error => {
  //     console.error('API call failed:', error);
  //   }
  // );

  }

  // callApi() {
  //   return this.reviews.side(this.des, this.name).pipe(
  //     catchError(error => {
  //       // Handle the error here if needed
  //       console.error('Caught error:', error);

  //       // Change this.des to 'egypt'
  //       this.des = 'egypt';

  //       // Retry the API call
  //       return this.reviews.side(this.des, this.name);
  //     }),
  //     retry(1)  // Number of retry attempts (remove or adjust as needed)
  //   );
  // }

}
