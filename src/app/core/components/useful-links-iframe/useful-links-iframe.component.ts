
import { Component, OnInit } from '@angular/core';
 import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-useful-links-iframe',
    imports: [
        TranslateModule
    ],
    templateUrl: './useful-links-iframe.component.html',
    styleUrls: ['./useful-links-iframe.component.css']
})
export class UsefulLinksIframeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
