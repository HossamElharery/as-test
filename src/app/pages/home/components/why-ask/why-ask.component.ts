import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { About } from '../../../../core/interfaces/about';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { SafeHtmlComponent } from '../../../../shared/components/safe-html/safe-html.component';
declare var $: any;

@Component({
    selector: 'app-why-ask',
    imports: [  TranslateModule, SafeHtmlComponent],
    templateUrl: './why-ask.component.html',
    styleUrl: './why-ask.component.scss'
})
export class WhyAskComponent implements OnInit, OnDestroy {
  img = []

  subscription: Subscription = new Subscription()
  aboutContainer: About[] = [];
  @ViewChild('videoPlayer') videoplayer!: ElementRef;
  hideIcon: boolean = true;

  isBrowser = false;

  constructor(
    private _about: HomeService,
    @Inject(DOCUMENT) private dom: any,
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determine if the code is running in the browser (avoids SSR errors)
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.getVideo();
    if (this.isBrowser) {
      this.stopVideo();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getVideo() {
    this.subscription.add(this._about.getAboutAs().subscribe(result => {
      this.aboutContainer = result.data;
      this.img = result.data[0].video
    }));
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
    this.hideIcon = false;
  }

  getSafeContent(content: string, maxLength?: number): string {
    if (!this.isBrowser || !content) {
      return '';
    }
    const stringContent = String(content);
    return maxLength ? stringContent.slice(0, maxLength) : stringContent;
  }

  stopVideo() {
    // Use jQuery event because Bootstrap 4 modal events are triggered via jQuery
    $(document).ready(() => {
      $('#myModal').on('hidden.bs.modal', () => {
        const video: HTMLVideoElement = this.videoplayer?.nativeElement;
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        this.hideIcon = true;
      });
    });
  }

}
