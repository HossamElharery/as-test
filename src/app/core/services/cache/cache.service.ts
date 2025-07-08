import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(@Inject(PLATFORM_ID) private platformId:any){}
  encryptSecretKey: string = 'ask-aladdin_Secret_Encryption_Key';

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      if (data != null) {
        return JSON.parse(this.decryptItems(data));
      }
    }

    return null;
  }

  setItem(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
    if (typeof data === 'string') {
      localStorage.setItem(key, this.encryptItem(data));
    }
    localStorage.setItem(key, this.encryptItem(JSON.stringify(data)));
  }
  }

  encryptItem(data: any): any {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.encryptSecretKey
      ).toString();
    } catch (e) { }
    return;
  }

  decryptItems(data: any): any {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) { }
  }

  isGranted(permission: string): boolean {
    let permissionList = this.getItem('permissions') as string[];
    if (!permissionList) return false;
    if (permissionList.find((f) => f === permission) == null) return false;

    return true;
  }

}
