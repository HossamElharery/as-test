import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId:any,
    @Inject(DOCUMENT) private dom: any
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    // let languageFromUrl;
    // this.dom.URL.includes('/en') ? languageFromUrl = 'en' : languageFromUrl = 'ar';
    // let lang = this.localizeRouterService.parser.currentLang || languageFromUrl || 'en';
    // if (lang == 'en') {
    //   lang = 'en-us';
    // } else if ('ar') {
    //   lang = 'ar-sa';
    // }

    // if (request.url.includes('login')) {
    //   const transformedReq = request.clone({
    //     setHeaders: { 'Accept-Language': lang }
    //   });
    //   return next.handle(transformedReq);
    // }
  }





}
