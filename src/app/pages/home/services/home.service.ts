import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private translate: TranslateService) { }

  // getHome(): Observable<any> {
  //   return this.http.get(`${environment.url}home/1/en`,);
  // }

  //en

  getSlider(): Observable<any> {
    return this.http.get(`${environment.url}sliders/en`);
  }

  getAboutAs(): Observable<any> {
    return this.http.get(`${environment.url}abouts/en`);
  }

  getAlldestination(): Observable<any> {
    return this.http.get(
      `${environment.url}destinations/en`
    );
  }

  getHomeBlog(): Observable<any> {
    return this.http.get(
      `${environment.url}home/blog/en`
    );
  }

  getPackages(): Observable<any> {
    return this.http.get(`${environment.url}packages/en`);
  }

}
