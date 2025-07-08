
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http:HttpClient , private translate:TranslateService) {}

  getSocials(): Observable<any> {
    return this.http.get(`${environment.url}socials/en`);
  }

  getMegaMenu(): Observable<any>{
    return this.http.get(`${environment.url}menus/en`)
  }

  getAlldestination(): Observable<any> {
    return this.http.get(
      `${environment.url}destinations/en`
    );
  }

  lang(): Observable<any> {
    return this.http.get(`${environment.url}lang-control`);
  }

  search(term: string): Observable<any> {
    return this.http.get(`${environment.url}search/${term}/en`
    );
  }

  getSubscribe(email: any): Observable<any> {
    return this.http.post(`${environment.url}email-subscription`, email);
  }


}
