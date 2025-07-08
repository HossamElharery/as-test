import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router'
import { Category } from '../../../core/interfaces/category';
import { destination } from '../../../core/interfaces/destination';
import { HomeserviceService } from '../../../core/services/homeservice.service';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-second-footer',
    imports: [RouterLink, TranslateModule, CommonModule],
    templateUrl: './second-footer.component.html',
    styleUrls: ['./second-footer.component.css']
})
export class SecondFooterComponent implements OnInit {
  categoryFooter:Category[]=[]
  id:any;
  singleDestination:destination[]=[]
  ides:any;
  singleDestinationContent:destination[]=[]
  packageOffer:destination[]=[]
  excursionsOffer:destination[]=[]
  cruisesOffer:destination[]=[]
  relatedPages:destination[]=[]
  Title:any;
  Meta:any;
  @Output() sendSlug:EventEmitter<string> = new EventEmitter()

  categorySlug: any;

  constructor(private _Home : HomeserviceService ,  private _active:ActivatedRoute, private _router: Router) {



   }

  ngOnInit(): void {

    this._active.paramMap.subscribe((params:ParamMap)=>{

      this.id=params.get('slug')

    this._Home.getOneDistination(this.id).subscribe({
      next: (res) => {

        this.singleDestination = res.data
        this._Home.getOneDestinationDetails(this.id).subscribe({
          next: (result) => {
            this.singleDestinationContent = result.data[0].categories
            this.packageOffer = result.data[0].packages_hot_offers
            this.excursionsOffer = result.data[0].excursions_hot_offers
            this.cruisesOffer =result.data[0].cruises_hot_offers
            this.relatedPages = result.data[0].related_pages
          },
          error: (e) => {

            this._router.navigate(['/404']);

          },
         });



        this._Home.categoryFooter(this.id).subscribe(res => {
          this.categoryFooter = res.data

      })

      },
      error: (e) => {

        this._router.navigate(['/404']);

      },
     });

     })


}



footerCat(category:any){

  this._Home.categoryFooter(this.id).subscribe( {
    next:(res:any)=>{
    this.categoryFooter = res.data
    this.categorySlug=category.slug
    },complete:()=>{
      this.sendSlug.emit(this.categorySlug);
      this._router.navigate([`/all-destinations/${category.destination.slug}/category/${category.slug}`])
    }

  });
}
emitCategorySlug(categorySlug: string): void {
  this.sendSlug.emit(categorySlug);
}
}
