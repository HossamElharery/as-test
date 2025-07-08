
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    imports: [TranslateModule],
    selector: 'app-we-are',
    templateUrl: './we-are.component.html',
    styleUrls: ['./we-are.component.css']
})
export class WeAreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
