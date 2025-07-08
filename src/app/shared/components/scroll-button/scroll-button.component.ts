import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    imports: [CommonModule, TranslateModule],
    selector: 'app-scroll-button',
    templateUrl: './scroll-button.component.html',
    styleUrls: ['./scroll-button.component.css']
})
export class ScrollButtonComponent implements OnInit {
    // back to top button
    windowScrolled!: boolean;
  constructor(@Inject(DOCUMENT) private document: Document ) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              // window.requestAnimationFrame(smoothscroll);
              // window.scrollTo(0, currentScroll - (currentScroll / 8));
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
         });
          }
      })();
  }
  ngOnInit() {
  }

}
