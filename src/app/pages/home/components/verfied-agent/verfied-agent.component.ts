import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Count } from '../../../../core/interfaces/count';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { CountUpDirective, CountUpModule } from 'ngx-countup';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-verfied-agent',
    imports: [CountUpModule, TranslateModule],
    templateUrl: './verfied-agent.component.html',
    styleUrl: './verfied-agent.component.scss'
})
export class VerfiedAgentComponent {
  countNum:Count[]=[];
  Verified : any;
  Tour:any;
  opts:any
  satisfied:any;
  @ViewChild('countUp') countUp!: CountUpDirective;
  count!: boolean;

  constructor( private _home:HomeserviceService , @Inject(DOCUMENT) private document: any , @Inject(PLATFORM_ID) private platformId:any) {}


  ngOnInit(): void {
    this.opts = {
      duration: 3,
    };

    this._home.Counter().subscribe(res => {
      this.countNum = res.data
      this.Verified = res.data.verified_agent
      this.Tour = res.data.tour_listed
      this.satisfied = res.data.satisfied_customer
    }
    )
  }
   @HostListener("window:scroll", [])
   onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const offset = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (offset >= 2800) {
       this.count = true

      }
    }
   }

}
