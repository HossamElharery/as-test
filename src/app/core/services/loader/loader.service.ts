import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  show(): void {
    let spinnerElm = document.getElementById('custom-spinner');
    spinnerElm ? spinnerElm.style.display = 'flex' : null;
  }

  hide() {
    let spinnerElm = document.getElementById('custom-spinner');
    spinnerElm ? spinnerElm.style.display = 'none' : null;
  }

}
