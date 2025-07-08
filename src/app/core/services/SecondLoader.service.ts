import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecondLoaderService {
  public loader:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public loaderFalse = false
constructor() { }
  setLoading(loading : boolean){
    this.loaderFalse = loading
  }
  getLoading():boolean{
    return this.loaderFalse
  }
}
