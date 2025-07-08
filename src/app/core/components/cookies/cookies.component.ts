
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [
    TranslateModule
],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {
  isShow = false
  value:any
  done: boolean | undefined
  constructor() {

   }

  ngOnInit(): void {
    this.value = localStorage.getItem('cookies')
    if(this.value == 'done'){
      this.done = this.isShow
    }else{
      this.done = !this.isShow
    }
  }
  show(){
    localStorage.setItem('cookies', 'done')
    this.done = this.isShow
  }
  hide(){
    this.done = this.isShow
  }

}
