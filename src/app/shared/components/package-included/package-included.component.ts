
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeserviceService } from '../../../core/services/homeservice.service';

@Component({
    imports: [TranslateModule],
    selector: 'app-package-included',
    templateUrl: './package-included.component.html',
    styleUrls: ['./package-included.component.css']
})
export class PackageIncludedComponent implements OnInit {
  @Input() package = false;
  @Input() excur = false;
  @Input() includ:any;
  // includ: any = [];
  ptional: any = [];
  id: any;
  excursion: any;
  constructor(
    private included: HomeserviceService,
    private _active: ActivatedRoute
  ) {}

  ngOnInit(): void {




  }
}
