import { Category } from './../../../../core/interfaces/category';
import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Blog } from '../../../../core/interfaces/blog';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    imports: [CommonModule, RouterLink, TranslateModule, NgbRatingModule, FormsModule],
    selector: 'app-optional-experts',
    standalone: true,
    templateUrl: './optional-experts.component.html',
    styleUrls: ['./optional-experts.component.css']
})
export class OptionalExpertsComponent implements OnInit, AfterViewChecked {
  idCruise: any;
  @Input() cruise = false
  @Input() package = false
  @Input() excure = false
  @Input() related: Blog[] = []
  @Input() category: any
  @Input() categoryName: any
  @Input() des: any
  excursions: any;

  constructor(public _optional: HomeserviceService, private _active: ActivatedRoute) { }

  idPack: any;
  id: any;
  @Input() optional: Blog[] = [];
  max = 5;
  isReadonly = true;
  x: number = 1

  ngOnInit(): void {
    this._active.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      this.excursions = params.get('excursion')
      this.idCruise = params.get('cruis')
      this.idPack = params.get('slug')
    })

    //  if(this.excure == true) {
    //   this._optional.getSingleExcursion(this.excursions).subscribe(result => {
    //     this.related = result.data[0].related_excursions
    //  })
    //  }

    //  this._optional.getSingleDestination(this.id).subscribe(result => {
    //    this.des = result.data.destination_slug
    //    })
  }

  ngAfterViewChecked() {
  }

  // Helper method to ensure rate is a number for proper rating display
  getRateAsNumber(rate: any): number {
    return typeof rate === 'string' ? parseInt(rate, 10) : rate || 0;
  }
}
