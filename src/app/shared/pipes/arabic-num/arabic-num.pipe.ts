import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNum',
  standalone: true
})
export class ArabicNumPipe implements PipeTransform {

  transform(value: number, language: string): string {
    if (language == 'en') {
      return value?.toString();
    } else {
      let newValue = "";
      for (let i = 0; i < value?.toString().length; i++) {
        let ch = value.toString().charCodeAt(i);
        if (ch >= 48 && ch <= 57) {
          let newChar = ch + 1584;
          newValue = newValue + String.fromCharCode(newChar);
        }
        else {
          newValue = newValue + String.fromCharCode(ch);
        }
      }
      return newValue;
    }
  }

}
