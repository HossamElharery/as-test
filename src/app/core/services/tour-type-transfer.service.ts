import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourTypeTransferService {

  private hiddenParamSource = new BehaviorSubject<any>(null);
  currentHiddenParam = this.hiddenParamSource.asObservable();
  private subscription!: Subscription;

  constructor( private router: Router, ) { }

  setHiddenParam(param: any) {
    this.hiddenParamSource.next(param);
  }

  clearHiddenParam() {
    this.hiddenParamSource.next(null);
  }

  navigateWithHiddenParam(slug:string,url:string) {

    const hiddenParam = slug;
    this.setHiddenParam(hiddenParam);
     this.router.navigate([`${url}`]);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.clearHiddenParam();
    }
  }}
