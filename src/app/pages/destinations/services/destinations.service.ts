
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
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
    return this.http.get(`${environment.url}lang-control/en`);
  }

  search(term: string): Observable<any> {
    return this.http.get(`${environment.url}search/${term}/en`
    );
  }

  getSubscribe(email: any): Observable<any> {
    return this.http.post(`${environment.url}email-subscription`, email);
  }

  getSinglePageGeneral(slug: string | number): Observable<any> {
    return this.http.get(`${environment.url}page/general/general/${slug}/en`);
  }


}
