import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, Renderer2, OnDestroy, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SeoService } from './core/services/seo.service';
import { FooterComponent } from './layout/footer/footer.component';
import { TranslationService } from './core/services/translate/language.service';
import { SponsorsComponent } from "./shared/components/sponsors/sponsors.component";

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    SponsorsComponent
],
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './app.component.responsive.scss'
    ]
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private translate: TranslateService,
    private seo: SeoService,
    @Inject(DOCUMENT) private dom: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Initialize global SEO - use SSR-safe method
    const currentLang = this.translate.currentLang || 'en';

    // For SSR, this is already handled by the app initializer
    // For browser, we still need to call it
    if (this.isBrowser) {
      this.seo.globalSeo(currentLang);
      this.checkLanguage();
      this.getUserData();
      this.checkChangeLang();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkLanguage(): void {
    if (!this.isBrowser) return;

    const htmlTag = this.dom.getElementsByTagName('html')[0] as HTMLHtmlElement;
    let currentLang = this.translate.currentLang || localStorage.getItem('currentLang') || 'en';

    if (currentLang === 'ar') {
      htmlTag.dir = 'rtl';
      htmlTag.lang = 'ar';
    } else {
      htmlTag.dir = 'ltr';
      htmlTag.lang = currentLang;
    }
  }

  checkChangeLang(): void {
    // Implementation for language change handling
  }

  getUserData(): void {
    // Implementation for getting user data
  }
}
