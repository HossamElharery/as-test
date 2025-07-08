
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,   } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeserviceService } from '../../../core/services/homeservice.service';

@Component({
    imports: [TranslateModule],
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  @Input() cruise = false;
  @Input() package = false;
  isReadonly=true;
  isReadMore = true
  elfsight = 'elfsight-app-088fd11a-c215-49a4-b886-4ccbe3bcc07b'
  idPack:any;
  id:any;
  image = "../../../../../assets/imgs/default-reviews.png"
  max=5;
  reviews:any;
  reviewsCruise:any;
  idCruise: any;

  showText() {
     this.isReadMore = !this.isReadMore
  }
  constructor(public reviewsTemp: HomeserviceService, private _active: ActivatedRoute) { }
  ngOnInit(): void {

    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.id=params.get('id')
      this.idPack=params.get('slug')
      this.idCruise=params.get('cruis')


    })
    if(this.package == true ){
      // this.reviewsTemp.getSinglepackage(this.idPack,1).subscribe(result => {

      //   this.reviews = result.data[0].reviews
      // })
    }

    if(this.cruise == true ){
      // this.reviewsTemp.getSingleCruise(this.idCruise,1).subscribe(result => {

      //   this.reviewsCruise = result.data[0].reviews

      // })
    }




  }

}
