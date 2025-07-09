// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable, EMPTY } from 'rxjs';

// @Injectable()
// export class SkipPublicInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Check if the URL contains 'https://api.ask-aladdin.com/public'
//     if (request.url.includes('public')) {

//       console.warn('Request skipped:', request.url);
//       return EMPTY; // Prevent the request from being sent by returning an empty observable
//     }

//     // Otherwise, pass the request to the next handler
//     return next.handle(request);
//   }
// }
