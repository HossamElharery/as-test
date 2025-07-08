
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { singleDestination } from '../../../../core/interfaces/single-destination';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { SafePipe } from "../../../../shared/pipes/safe-url.pipe";
import { innerHtmlPipe } from "../../../../shared/pipes/innerHtml/innerHtml.pipe";


@Component({
    imports: [RouterLink, TranslateModule, SafePipe, innerHtmlPipe],
    selector: 'app-catergory',
    templateUrl: './catergory.component.html',
    styleUrls: ['./catergory.component.css']
})
export class CatergoryComponent implements OnInit {
  Filter:singleDestination[]=[]
  image = "../../../../../../../assets/imgs/default.png"
  count: any;
  descount: any;
  hot: any;
  nameCountry: any;
  Title: any;
  ide: any;
  cat: any;
  id: any;

  constructor(private _singleDes: HomeserviceService, private sanitizer: DomSanitizer ,  private _active: ActivatedRoute ,private ngMod: NgbModal) {

   }

  ngOnInit(): void {

    this._active.paramMap.subscribe((params:ParamMap)=>{
      this.ide=params.get('categoreyId')
      this.cat=params.get('categorySlug')
      this.id=params.get('slug')
    })
    this._singleDes.getSingleDestinationFilter(this.id , 0 ,10000,1,30,1,5).subscribe(result => {
      this.Filter = result.data
      this.count = result.data.length


      // this.id , 0 ,10000,this.minDay,this.maxDay,this.minRate,this.MaxRate

      this.descount = result.data.discount + "%"
      this.hot = result.data.hot_offer
      this.nameCountry = result.data[0].destination_name;
    })
  }

  openVerticallyCentered(content: any) {
    this.ngMod.open(content, { centered: true });


  }
}
