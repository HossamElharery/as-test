import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject$ = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }


}
