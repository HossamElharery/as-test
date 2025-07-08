import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main-hotels',
    imports: [
        RouterOutlet
    ],
    templateUrl: './main-hotels.component.html',
    styleUrls: ['./main-hotels.component.css']
})


export class MainHotelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
