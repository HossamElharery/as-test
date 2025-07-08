
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Hotel } from '../../../../core/interfaces/hotel';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    imports: [CarouselModule, TranslateModule, FormsModule, NgbRatingModule],
    selector: 'app-start-from',
    templateUrl: './start-from.component.html',
    styleUrls: ['./start-from.component.css']
})
export class StartFromComponent implements OnInit {
  @Input() start:any = [];
  max=5;
  isReadonly=true
  num : any;
  id:any
   @Input() includeds:any[]=[]
  idCru: any;
  cruises: any;
  rates:Hotel[]=[]
  excursion: any;
  startPrices: any;
  constructor() { }
  @Input() cruise = false
  @Input() package = false
  @Input() excure = false
  ngOnInit(): void {
}
}

