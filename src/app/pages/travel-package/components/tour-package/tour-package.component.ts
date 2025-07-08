
import { Component, OnInit } from '@angular/core';
import { ScrollButtonComponent } from "../../../../shared/components/scroll-button/scroll-button.component";
import { PackageDetailsComponent } from "../package-details/package-details.component";

@Component({
    imports: [ScrollButtonComponent, PackageDetailsComponent],
    selector: 'app-tour-package',
    templateUrl: './tour-package.component.html',
    styleUrls: ['./tour-package.component.css']
})
export class TourPackageComponent implements OnInit {

  id:any ;
  categorySlug: any;
  constructor() { }

  ngOnInit(): void {

  }


}
