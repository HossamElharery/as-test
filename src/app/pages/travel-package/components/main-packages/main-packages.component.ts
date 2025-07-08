import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    imports: [RouterOutlet],
    selector: 'app-main-packages',
    templateUrl: './main-packages.component.html',
    styleUrls: ['./main-packages.component.css']
})
export class MainPackagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
