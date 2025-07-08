import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  mapData(data: any, paginate: any) {
    let from = paginate?.from;
    data = data.map((item: any, index: number) => {
      item.number = from + index
      return item
    })
    return data
  }

}
