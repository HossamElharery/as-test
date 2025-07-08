
import { Component, OnInit } from '@angular/core';
 import { TranslateModule } from '@ngx-translate/core';

import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { ExpertReviewsComponent } from '../../../shared/components/side-bar/expert-reviews/expert-reviews.component';

@Component({
    selector: 'app-thanks',
    imports: [
        TranslateModule,
        ExpertReviewsComponent,
        ScrollButtonComponent
    ],
    templateUrl: './thanks.component.html',
    styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
