import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  loader = false
  constructor() { }

  ngOnInit(): void {
    // this.loader = true
    // setTimeout(() => {
    //   this.loader = false
    // }, 5000);
  }

}
